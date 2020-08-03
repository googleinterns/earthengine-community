/**
 * @fileoverview This file contains the logic for rendering a template given its corresponding JSON string. It is used
 * whenever we want to display a new template on the story-board.
 */
import { AppCreatorStore, WidgetMetaData } from '../redux/reducer';
import { ROOT_ID } from './constants';
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
import { getWidgetType } from './helpers';
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
  const templateCopy = Object.assign({}, template);
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
    case WidgetType.map:
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
    case WidgetType.panel:
    case WidgetType.sidemenu:
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
 * Retrieves previous template from store and populates user added widgets.
 */
export function transferData() {
  try {
    const template = localStorage.getItem('previousTemplate');

    if (template) {
      const templateJSON = JSON.parse(template);
      const widgets = templateJSON.widgets;
      const panelIDs = [];

      // Get all panels that are not the root and that exist in the new and old template.
      for (const widgetID in widgets) {
        if (
          widgetID !== ROOT_ID &&
          (widgetID.startsWith('panel') || widgetID.startsWith('sidemenu')) &&
          store.getState().template.widgets.hasOwnProperty(widgetID)
        ) {
          panelIDs.push(widgetID);
        }
      }

      /**
       * Populating store with widgets that share the same IDs.
       */
      for (const panelID of panelIDs) {
        for (const child of widgets[panelID].children) {
          const childMetaData: WidgetMetaData = widgets[child];
          const { id, uniqueAttributes, style } = childMetaData;

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
       * Getting remainding widgets that have not been added.
       */
      const remainingWidgetIDs: string[] = [];
      for (const id in widgets) {
        if (
          !id.startsWith('panel') &&
          !id.startsWith('sidemenu') &&
          !(id in store.getState().template.widgets)
        ) {
          remainingWidgetIDs.push(id);
        }
      }

      store.dispatch(setEventType(EventType.changingTemplate, true));
    }
  } catch (e) {
    throw e;
  }
}

/**
 * Updates widget IDs. Since we pre-populate the template by widgets from the previous template,
 * we need to increment the widget IDs in our store to match the new widgets.
 */
export function incrementWidgetIDs(widgets: { [key: string]: WidgetMetaData }) {
  const updatedIDs: AppCreatorStore['widgetIDs'] = {};
  for (const key in store.getState().widgetIDs) {
    let largest = -Infinity;
    for (const widgetID in widgets) {
      const type = getWidgetType(widgetID);
      if (type === key) {
        const idCount = parseInt(widgetID.slice(widgetID.lastIndexOf('-') + 1));
        largest = Math.max(largest, idCount);
      }
    }
    if (largest !== -Infinity) {
      updatedIDs[key] = largest + 1;
    }
  }

  store.dispatch(updateWidgetIDs(updatedIDs));

  localStorage.removeItem('previousTemplate');
}
