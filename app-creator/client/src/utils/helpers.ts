import {
  DeviceType,
  WidgetsRequiringBackground,
  WidgetType,
} from '../redux/types/enums';
import { AppCreatorStore } from '../redux/reducer';
import { WIDGET_REF, TEMPLATE_SNAPSHOTS } from './constants';
import { store } from '../redux/store';
import { html, TemplateResult } from 'lit-element';
import { EEWidget } from '../redux/types/types';
import { sharedAttributes } from '../redux/types/attributes';
import '@polymer/paper-toast/paper-toast';

const WIDGET_REF_KEYS = new Set([
  'draggingElement',
  'editingElement',
  WIDGET_REF,
]);

/**
 * Converts camel case to title case.
 * ie. helloWorld => Hello World
 */
export function camelCaseToTitleCase(text: string) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Empty set placeholder.
 */
export const emptySet = new Set();

/**
 * Returns widget type.
 * id. 'label-0' => 'label'
 */
export function getWidgetType(id: string): WidgetType {
  const index = id.indexOf('-');

  if (index === -1) {
    return id as WidgetType;
  }

  return id.slice(0, index) as WidgetType;
}

/**
 * Used when getting prefix of wrapper widget.
 */
export function getIdPrefixLastIndex(id: string) {
  const index = id.lastIndexOf('-');

  if (index === -1) {
    return id;
  }

  return id.slice(0, index);
}

/**
 * Empty function. Used as a placeholder.
 */
export const noop: VoidFunction = () => {};

/**
 * List of chip data used for sorting templates by device type.
 */
export const chips = [
  {
    label: 'All',
    device: DeviceType.ALL,
  },
  {
    label: 'Web',
    device: DeviceType.DESKTOP,
  },
  {
    label: 'Mobile',
    device: DeviceType.MOBILE,
  },
];

/**
 * Creates a toast message element.
 */
export function createToastMessage(
  id: string,
  message: string,
  duration?: number
): TemplateResult {
  return html`<paper-toast
    id=${id}
    text=${message}
    duration=${duration ?? 10000}
  ></paper-toast> `;
}

/*
 * Generates random ids with length 32.
 */
export function generateRandomId() {
  return [...Array(32)]
    .map((_) => (~~(Math.random() * 36)).toString(36))
    .join('');
}

/**
 * Returns a deep clone of template without widgetRefs.
 */
export function deepCloneTemplate(
  template: AppCreatorStore['template'],
  skipRefs: boolean = true
): AppCreatorStore['template'] {
  const clone: AppCreatorStore['template'] = {};
  for (const key in template) {
    /**
     * Widget refs are only needed in the context of the app creator. Once we serialize the data,
     * we no longer need to keep the refs. As a result, we skip over them when we are producing the
     * output string.
     */
    if (skipRefs && WIDGET_REF_KEYS.has(key)) {
      continue;
    }

    if (Array.isArray(template[key])) {
      clone[key] = template[key].slice();
    } else if (typeof template[key] === 'object' && !WIDGET_REF_KEYS.has(key)) {
      clone[key] = deepCloneTemplate(template[key], skipRefs);
    } else {
      clone[key] = template[key];
    }
  }

  return clone;
}

/**
 * Takes a snapshot of the current store and stores it in localStorage.
 */
export function storeSnapshotInLocalStorage(timestamp: number) {
  try {
    /**
     * Saving current store snapshot as a string in localStorage so we can transfer data across.
     */
    const storeSnapshot = JSON.stringify(deepCloneTemplate(store.getState()));

    /*
     * Retrieve template snapshots object from local storage if it exists.
     * The snapshots object contains templates keyed by their timestamp.
     * Alternatively, we can use the timestamp to key directly into localStorage
     * rather than creating an extra buffer and doing unnecessary parsing.
     */
    const templateSnapshots = localStorage.getItem(TEMPLATE_SNAPSHOTS);

    let templates: { [timestamp: string]: string } = {};
    if (templateSnapshots) {
      // If templateSnapshots exist, we want to retrieve it and convert it into an object.
      templates = JSON.parse(templateSnapshots);
    }

    // Add the store snapshot as a new entry with the key being the timestamp.
    templates[timestamp] = storeSnapshot;

    // Stringify templates and store it back in localStorage.
    localStorage.setItem(TEMPLATE_SNAPSHOTS, JSON.stringify(templates));
  } catch (e) {
    throw e;
  }
}

/**
 * Set URL parameter given a key and a value.
 */
export function setUrlParam(key: string, value: string): URL {
  const url = new URL(location.href);
  url.searchParams.set(key, value);

  if (window.history.replaceState) {
    //prevents browser from storing history with each change:
    window.history.replaceState(null, '', url.href);
  }

  return url;
}

export function addBackgroundColorToSharedWidget(element: HTMLElement) {
  const elementStyle: { [key: string]: string } = Object.assign(
    {},
    store.getState().template.widgets[element.id].style
  );

  const type = getWidgetType(element.id);
  if (
    elementStyle.color === '#ffffff' &&
    elementStyle.backgroundColor.length === 9 &&
    elementStyle.backgroundColor.endsWith('00') &&
    Object.values(WidgetsRequiringBackground).includes(type)
  ) {
    const paletteBackground = store.getState().selectedPalette.backgroundColor;
    elementStyle.backgroundColor =
      paletteBackground === '#ffffff' ? '#000000' : paletteBackground;
    elementStyle.borderRadius = '8px';
    elementStyle.padding = '8px';
    (element as EEWidget).setStyle(elementStyle);
  }
}

/**
 * Removes background color from an element. Used when adding elements to the scratch panel.
 */
export function removeBackgroundColorFromSharedWidget(element: HTMLElement) {
  const elementStyle: { [key: string]: string } = Object.assign(
    {},
    store.getState().template.widgets[element.id].style
  );

  elementStyle.borderRadius = elementStyle.borderRadius ?? '4px';
  elementStyle.padding = elementStyle.padding ?? sharedAttributes.padding.value;
  (element as EEWidget).setStyle(elementStyle);
}
