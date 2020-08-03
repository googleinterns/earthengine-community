import { DeviceType } from '../redux/types/enums';
import { AppCreatorStore } from '../redux/reducer';
import { WIDGET_REF } from './constants';
import { store } from '../redux/store';

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
  return id.slice(0, id.indexOf('-'));
}

/**
 * Used when getting prefix of wrapper widget.
 */
export function getIdPrefixLastIndex(id: string) {
  return id.slice(0, id.lastIndexOf('-'));
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
    device: DeviceType.all,
  },
  {
    label: 'Web',
    device: DeviceType.desktop,
  },
  {
    label: 'Mobile',
    device: DeviceType.mobile,
  },
];

/**
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
  template: AppCreatorStore['template']
): AppCreatorStore['template'] {
  const clone: AppCreatorStore['template'] = {};
  for (const key in template) {
    /**
     * Widget refs are only needed in the context of the app creator. Once we serialize the data,
     * we no longer need to keep the refs. As a result, we skip over them when we are producing the
     * output string.
     */
    if (key === WIDGET_REF) {
      continue;
    }
    if (typeof template[key] === 'object' && !Array.isArray(template[key])) {
      clone[key] = deepCloneTemplate(template[key]);
    } else if (Array.isArray(template[key])) {
      clone[key] = template[key].slice();
    } else {
      clone[key] = template[key];
    }
  }

  return clone;
}

/**
 * Takes a snapshot of the current template and stores it in localStorage.
 */
export function storeTemplateInLocalStorage() {
  try {
    /**
     * Saving current template string in localStorage so we can transfer data across.
     * */
    const currentTemplate = JSON.stringify(
      deepCloneTemplate(store.getState().template)
    );

    localStorage.setItem('previousTemplate', currentTemplate);
  } catch (e) {
    throw e;
  }
}
