import { DeviceType } from '../redux/types/enums';
import { AppCreatorStore } from '../redux/reducer';
import { WIDGET_REF } from './constants';

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
    if (skipRefs && key === WIDGET_REF) {
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
