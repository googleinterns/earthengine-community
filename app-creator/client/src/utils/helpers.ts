import { DeviceType } from '../redux/types/enums';
import { AppCreatorStore } from '../redux/reducer';
import { WIDGET_REF } from './constants';
import { store } from '../redux/store';
import { html, TemplateResult } from 'lit-element';
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
 * Returns widget type.
 * id. 'label-0' => 'label'
 */
export function getWidgetType(id: string): string {
  const index = id.indexOf('-');

  if (index === -1) {
    return id;
  }

  return id.slice(0, index);
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

export function createToastMessage(
  id: string,
  message: string
): TemplateResult {
  return html`<paper-toast
    id=${id}
    text=${message}
    duration="10000"
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
    } else if (typeof template[key] === 'object' && key !== WIDGET_REF) {
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
export function storeSnapshotInLocalStorage(timestamp?: number) {
  try {
    /**
     * Saving current store snapshot as a string in localStorage so we can transfer data across.
     * */
    const storeSnapshot = JSON.stringify(deepCloneTemplate(store.getState()));

    // Retrieve template stack from local storage if it exists.
    const templateStackJSON = localStorage.getItem('templateStack');
    let templateStackArray = [];
    if (templateStackJSON) {
      // If templateStack exits, we want to retrieve it and convert it into an array.
      templateStackArray = JSON.parse(templateStackJSON);
    }

    const timestampValue = timestamp ?? Date.now();

    // Add the store snapshot as a new entry with the key being the timestamp.
    templateStackArray.push({
      timestamp: timestampValue,
      snapshot: storeSnapshot,
    });

    // Stringify the templateStackArray and store it back in localStorage.
    localStorage.setItem(`templateStack`, JSON.stringify(templateStackArray));
  } catch (e) {
    throw e;
  }
}
