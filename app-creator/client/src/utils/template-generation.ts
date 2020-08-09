/**
 * @fileoverview This file contains the logic for rendering a template given its corresponding JSON string. It is used
 * whenever we want to display a new template on the story-board.
 */
import { AppCreatorStore, WidgetMetaData } from '../redux/reducer';
import { ROOT_ID, TEMPLATE_SNAPSHOTS, TEMPLATE_TIMESTAMP } from './constants';
import { store } from '../redux/store';
import {
  setSelectedTemplate,
  addWidgetMetaData,
  updateWidgetChildren,
  setEventType,
  updateWidgetIDs,
} from '../redux/actions';
import { Dropzone } from '../widgets/dropzone-widget/dropzone-widget';
import { DraggableWidget } from '../widgets/draggable-widget/draggable-widget';
import { getWidgetType, deepCloneTemplate } from './helpers';
import { EEWidget } from '../redux/types/types';
import { WidgetType, EventType } from '../redux/types/enums';
import { Panel } from '../widgets/ui-panel/ui-panel';
import { Map } from '../widgets/ui-map/ui-map';
import { SideMenu } from '../widgets/ui-sidemenu/ui-sidemenu';
import '../widgets/ui-sidemenu/ui-sidemenu';

/**
 * Builds a DOM tree given a template JSON and renders it in the provided HTML node.
 */
export function generateUI(
  template: AppCreatorStore['template'],
  node: HTMLElement
) {
  const templateCopy = deepCloneTemplate(template);

  // Recursively creates ui widgets and returns the root of the tree.
  function getWidgetTree(widgetData: WidgetMetaData): HTMLElement {
    const { id, children } = widgetData;
    const { element, dropzone, map, draggable } = getWidgetElement(widgetData);

    for (const childID of children) {
      if (dropzone != null) {
        dropzone.appendChild(getWidgetTree(templateCopy.widgets[childID]));
      } else {
        element.appendChild(getWidgetTree(templateCopy.widgets[childID]));
      }
    }

    templateCopy.widgets[id].widgetRef = map ?? element;

    return draggable ?? element;
  }

  // The root of the template will always have an id of panel-template-0
  const root = templateCopy.widgets[ROOT_ID];

  node.appendChild(getWidgetTree(root));
  // Replace the store's template with the one that include the widgetRefs.
  store.dispatch(setSelectedTemplate(templateCopy));
}

/**
 * Returns the corresponding ui widget for each widget type.
 */
export function getWidgetElement({
  id,
  editable,
  uniqueAttributes,
  style,
}: WidgetMetaData): {
  element: HTMLElement;
  dropzone: Dropzone | null;
  map: Map | null;
  draggable: DraggableWidget | null;
} {
  // Get widget type (ie. panel-0 -> panel).
  const type = getWidgetType(id);

  // Create DOM element.
  let element = document.createElement(`ui-${type}`);
  element.id = id;

  // Set Unique attributes.
  for (const attribute in uniqueAttributes) {
    element.setAttribute(attribute, uniqueAttributes[attribute]);
  }

  // Set styles.
  if ('setStyle' in (element as EEWidget)) {
    (element as EEWidget).setStyle(style);
  }

  let dropzone = null;
  let map = null;
  let draggable = null;

  switch (type) {
    case WidgetType.MAP:
      // We wrap the map with a div and give it a height and width of a 100%.
      const wrapper = document.createElement('div');
      wrapper.style.width = element.style.width;
      wrapper.style.height = element.style.height;

      if ((element as Map).setStyle && (element as Map).setAttribute) {
        const mapElement = element as Map;
        mapElement.setAttribute('apiKey', window.process.env.MAPS_API_KEY);
        mapElement.setStyle({
          height: '100%',
          width: '100%',
        });
        wrapper.appendChild(mapElement);
        map = mapElement;
      }

      element = wrapper;
      break;
    case WidgetType.PANEL:
    case WidgetType.SIDEMENU:
      if ((element as Panel).editable) {
        (element as Panel).editable = !!editable;
      }

      if ((element as SideMenu).editable) {
        (element as SideMenu).editable = !!editable;
      }

      if (editable) {
        const dropzoneWidget = new Dropzone();
        dropzoneWidget.classList.add('full-height');
        element.appendChild(dropzoneWidget);
        dropzone = dropzoneWidget;
      }

      break;
    default:
      const draggableWrapper = document.createElement('draggable-widget');
      draggableWrapper.appendChild(element);
      draggableWrapper.editable = true;
      draggable = draggableWrapper;
      break;
  }

  return { element, dropzone, map, draggable };
}

/**
 * Retrieves previous template from localStorage and populate new template with widgets.
 */
export function transferData() {
  try {
    // Retrieve template stack from storage.
    const templateSnapshots: string | null = localStorage.getItem(
      TEMPLATE_SNAPSHOTS
    );

    if (!templateSnapshots) {
      return;
    }

    let templates: { [timestamp: string]: string } = JSON.parse(
      templateSnapshots
    );

    if (!templates) {
      return;
    }

    let snapshot: string | null = null;

    // Get template timestamp from URL
    const queryString = window.location.search;
    if (queryString !== '') {
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has(TEMPLATE_TIMESTAMP)) {
        const timestamp = urlParams.get(TEMPLATE_TIMESTAMP);
        if (timestamp) {
          snapshot = templates[timestamp];
          if (snapshot) {
            delete templates[timestamp];
          }
        }

        // Remove parameter from URL.
        window.history.replaceState(null, '', window.location.pathname);
        localStorage.setItem(TEMPLATE_SNAPSHOTS, JSON.stringify(templates));
      }
    }

    if (snapshot != null) {
      const storeJSON = JSON.parse(snapshot);

      const { widgets } = storeJSON.template;

      /**
       * Get all panels that are not the root and that exist in the new and old template.
       * We need to retrieve panels and sidemenu widgets, because they are containers
       * that could hold user added widgets (i.e. label, button, etc...).
       */
      const panelIDs = [];
      for (const widgetID in widgets) {
        if (
          widgetID !== ROOT_ID &&
          (widgetID.startsWith(WidgetType.PANEL) ||
            widgetID.startsWith(WidgetType.SIDEMENU)) &&
          store.getState().template.widgets.hasOwnProperty(widgetID)
        ) {
          panelIDs.push(widgetID);
        }
      }

      /**
       * Populating store with widgets that share the same IDs.
       */
      for (const panelID of panelIDs) {
        const { children } = widgets[panelID];
        for (const child of children) {
          const childMetaData: WidgetMetaData = widgets[child];
          const { id, uniqueAttributes, style } = childMetaData;

          // Create DOM element using meta data. Returns EEWidget (i.e. <ui-label></ui-label>).
          const { element } = getWidgetElement(childMetaData);

          store.dispatch(
            addWidgetMetaData(id, element, uniqueAttributes, style)
          );

          store.dispatch(
            updateWidgetChildren(panelID, [
              ...store.getState().template.widgets[panelID].children,
              id,
            ])
          );
        }
      }

      /**
       * Getting remainding widgets that have not been added. We will populate the scratch panel
       * with these widgets so that the user can add them later on.
       */
      const remainingWidgetIds: string[] = [];
      for (const id in widgets) {
        if (
          !id.startsWith('panel') &&
          !id.startsWith('sidemenu') &&
          !(id in store.getState().template.widgets)
        ) {
          remainingWidgetIds.push(id);
        }
      }

      store.dispatch(setEventType(EventType.CHANGINGTEMPLATE, true));

      incrementWidgetIDs(widgets);
    }
  } catch (e) {
    throw e;
  }
}

/**
 * Updates widget ids. Since we pre-populate the template by widgets from the previous template,
 * we need to increment the widget IDs in our store to match the new widgets.
 */
export function incrementWidgetIDs(widgets: { [key: string]: WidgetMetaData }) {
  const updatedIDs: AppCreatorStore['widgetIDs'] = {};
  for (const key in store.getState().widgetIDs) {
    let largest = -Infinity;

    for (const widgetID in widgets) {
      const type = getWidgetType(widgetID);
      if (type === key) {
        try {
          const index = widgetID.lastIndexOf('-');
          if (index === -1) {
            throw new Error('Widget id incorrectly formatted');
          }
          const count = widgetID.slice(index + 1);
          const countInt = parseInt(count);
          largest = Math.max(largest, countInt);
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (largest !== -Infinity) {
      updatedIDs[key] = largest + 1;
    }
  }

  store.dispatch(updateWidgetIDs(updatedIDs));

  return updatedIDs;
}
