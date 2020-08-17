/**
 * @fileoverview This file contains helper functions that are specific to the reducer itself.
 */
import { AppCreatorStore, WidgetMetaData } from './reducer';
import { PaletteNames } from './types/enums';
import { PalettePicker } from '../widgets/palette-picker/palette-picker';
import { EEWidget } from './types/types';
import { UpdateWidgetMetaData } from './types/actions';

/**
 * Removes widget meta data from the current template.
 */
export function removeWidgetHelper(
  template: AppCreatorStore['template'],
  reordering: boolean,
  widgetToRemoveId: string
) {
  if (!reordering) {
    // In the case of reordering widgets, we do not want to remove the widget meta data.
    delete template.widgets[widgetToRemoveId];
  }

  // Iterate over all widgets and remove the current widget id from the children's list.
  const { widgets } = template;
  for (const key in widgets) {
    const widget = widgets[key];
    if (
      typeof widget === 'object' &&
      !Array.isArray(widget) &&
      'children' in widget
    ) {
      widget.children = widget.children.filter(
        (id: string) => id !== widgetToRemoveId
      );
    }
  }
}

/**
 * Takes in a widgets object and applies a selected color palette to it.
 */
export function applyPalette(
  widgets: { [id: string]: WidgetMetaData },
  color: PaletteNames
) {
  for (const widgetId in widgets) {
    // Set the background color of panel elements. Non-panel elements start with a transparent background.
    if (widgetId.startsWith('panel') || widgetId.startsWith('sidemenu')) {
      widgets[widgetId].style.backgroundColor =
        PalettePicker.palette[color].backgroundColor;
      widgets[widgetId].style.color = PalettePicker.palette[color].color;
      widgets[widgetId].style.backgroundOpacity = '100';
    } else if (widgetId.startsWith('map')) {
      // Apply map styling.
      widgets[widgetId].uniqueAttributes.mapStyles =
        PalettePicker.palette[color].map;
    } else if (
      !widgetId.startsWith('panel') &&
      !widgetId.startsWith('button')
    ) {
      // Apply color property on non-panel elements.
      widgets[widgetId].style.color = PalettePicker.palette[color].color;
      // Setting transparent background.
      widgets[widgetId].style.backgroundColor = '#ffffff00';
    } else if (widgetId.startsWith('button')) {
      // Apply styles for button elements.
      widgets[widgetId].style.backgroundColor =
        PalettePicker.palette[color].color;
      widgets[widgetId].style.color =
        PalettePicker.palette[color].backgroundColor;
      widgets[widgetId].style.backgroundOpacity = '100';
    }
    (widgets[widgetId].widgetRef as EEWidget)?.setStyle(
      widgets[widgetId].style
    );
  }
}

/**
 * Adds default styles to all widgets.
 */
export function addDefaultStyles(template: { [key: string]: any }) {
  // Extract widgets from template.
  const { widgets } = template;

  // Merge default styles with each widget's style object. Styles defined under
  // the widget itself has a higher presedence and thus overwrites any defaults.
  for (const id in widgets) {
    // Create a copy of the style object.
    const styleCopy: { [key: string]: string } = Object.assign(
      {},
      DEFAULT_STYLES
    );

    // Apply any styles defined in the widget's style object.
    for (const attribute in widgets[id].style) {
      styleCopy[attribute] = widgets[id].style[attribute];
    }

    // Overwrite style object with the new one containing defaults.
    widgets[id].style = styleCopy;
  }
}

/**
 * Updates DOM element with unique attributes.
 */
export function updateUniqueAttributesInDOM(
  widget: HTMLElement,
  template: AppCreatorStore['template']
) {
  for (const attr of Object.keys(
    template.widgets[widget.id].uniqueAttributes
  )) {
    widget.setAttribute(
      attr,
      template.widgets[widget.id].uniqueAttributes[attr]
    );
  }
}

/**
 * Return hex code for background color with the last two values indicating opacity.
 */
export function getBackgroundColor(style: { [key: string]: any }): string {
  // Stringified number from 0 - 100 (only integers) or an empty string.
  let backgroundOpacityStr = style.backgroundOpacity;

  // Empty string case.
  if (backgroundOpacityStr === '') {
    backgroundOpacityStr = '100';
  }

  const backgroundOpacity = parseInt(backgroundOpacityStr);

  const fraction = backgroundOpacity / 100;

  const hexFraction = Math.floor(255 * fraction);

  // Ensure that the hex number is at least two digits.
  let hexNumberString = ('0' + hexFraction.toString(16)).slice(-2);

  const newBackgroundColor =
    style.backgroundColor.slice(0, 7) + hexNumberString.toLowerCase();

  // Example: #ffffff00, where the last two hex numbers represent the opacity.
  return newBackgroundColor;
}

/**
 * This function updates the attribute value of a particular widget (i.e. width: 80px -> 50px).
 * It also considers unit changes (i.e. width: 80px -> 80%).
 */
export function updateWidgetAttribute(
  template: AppCreatorStore['template'],
  { attributeName, value, id, attributeType }: UpdateWidgetMetaData['payload']
) {
  /**
   * If the attribute name ends with unit, it means that we are dealing with
   * an attribute that accepts multiple units (i.e. px, %, etc...). And we want
   * to edit the unit itself (i.e. width: 80px -> 80%, where the value stays the same).
   */
  if (attributeName.endsWith('unit')) {
    // Retrieve prefix (i.e. width-unit -> width).
    const attributePrefix = getAttributePrefix(attributeName);

    // Get width value from the template.
    const attributeValue = template.widgets[id][attributeType][attributePrefix];

    // Check what the previous unit was. If it was px, then we replace it with
    // the updated value (It could be 'px' again or '%').
    if (attributeValue.endsWith('px')) {
      template.widgets[id][attributeType][
        attributePrefix
      ] = attributeValue.replace('px', value);
    } else {
      template.widgets[id][attributeType][
        attributePrefix
      ] = attributeValue.replace('%', value);
    }
  } else {
    /**
     * In the case where the attribute name does not end with unit, we want to edit the value itself
     * and append whatever unit was previously set (i.e. 80px -> 50px, where the unit does not change).
     */

    // Retrieve attribute value from the template. We will use this to extract the
    // unit value.
    const attributeValue = template.widgets[id][attributeType][attributeName];

    // Update the template with the new value from the payload.
    template.widgets[id][attributeType][attributeName] = value;

    /**
     * attributeValue -> previous value
     * value -> updated value
     * We check if attribute value has a unit at the end. If it does, we check if the
     * new value contains a unit. If it does not, then we append the corresponding unit from
     * the previous value.
     */
    if (attributeValue.endsWith('px') || attributeValue.endsWith('%')) {
      if (!value.endsWith('px') && !value.endsWith('%')) {
        template.widgets[id][attributeType][
          attributeName
        ] += attributeValue.endsWith('px') ? 'px' : '%';
      }
    }
  }
}

/**
 * Returns attribute prefix.
 * attribute: 'width-unit' => 'width'
 */
export function getAttributePrefix(attribute: string): string {
  const index = attribute.indexOf('-');

  if (index === -1) {
    return attribute;
  }

  return attribute.slice(0, index);
}

/**
 * List of default styles shared across all widgets.
 */
export const DEFAULT_STYLES: { [key: string]: string } = {
  height: 'px',
  width: 'px',
  padding: '0px',
  margin: '8px',
  borderWidth: '0px',
  borderStyle: 'solid',
  borderColor: '#000000',
  fontSize: '12px',
  color: '#000000',
  backgroundColor: '#ffffff',
  backgroundOpacity: '0',
  fontWeight: '300',
  fontFamily: 'Roboto',
  textAlign: 'left',
  whiteSpace: 'normal',
  shown: 'true',
};
