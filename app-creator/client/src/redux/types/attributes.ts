/**
 * @license
 * Copyright 2020 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview This file contains interface types for the different style
 * attributes.
 */

import {Button} from '../../widgets/ui-button/ui-button';
import {Chart} from '../../widgets/ui-chart/ui-chart';
import {Checkbox} from '../../widgets/ui-checkbox/ui-checkbox';
import {Label} from '../../widgets/ui-label/ui-label';
import {Map} from '../../widgets/ui-map/ui-map';
import {Select} from '../../widgets/ui-select/ui-select';
import {Slider} from '../../widgets/ui-slider/ui-slider';
import {Textbox} from '../../widgets/ui-textbox/ui-textbox';

import {InputType} from './enums';

export type SharedAttributes =
    |'height'|'width'|'padding'|'margin'|'color'|'backgroundColor'|
    'backgroundOpacity'|'borderWidth'|'borderStyle'|'borderColor'|'fontSize'|
    'fontWeight'|'fontFamily'|'textAlign'|'whiteSpace'|'shown';

export interface Tooltip {
  text?: string;
  url?: string;
}

export interface AttributeMetaData {
  [key: string]: {
    value: string;
    placeholder?: string;
    tooltip?: Tooltip;
    unit?: string;
    step?: number;
    min?: number;
    max?: number; type: InputType;
    items?: string[];
    validator?: (value: string) => boolean;
  };
}

export interface DefaultAttributesType {
  [key: string]: string;
}

export const sharedAttributes: AttributeMetaData = {
  height: {
    value: 'px',
    placeholder: '35',
    unit: 'px',
    type: InputType.NUMBER,
  },
  width: {
    value: 'px',
    placeholder: '35',
    unit: 'px',
    type: InputType.NUMBER,
  },
  padding: {
    value: '0px',
    placeholder: 'ie. \'8px\', \'8px 8px\', \'8px 8px 8px 8px\'',
    type: InputType.TEXT,
  },
  margin: {
    value: '8px',
    placeholder: 'ie. \'8px\', \'8px 8px\', \'8px 8px 8px 8px\'',
    type: InputType.TEXT,
  },
  color: {
    value: '#000000',
    type: InputType.COLOR,
  },
  backgroundColor: {
    value: '#ffffff00',
    type: InputType.COLOR,
  },
  backgroundOpacity: {
    value: '0',
    placeholder: '0 - 100',
    min: 0,
    max: 100,
    type: InputType.NUMBER,
  },
  borderWidth: {
    value: '0',
    placeholder: '0',
    type: InputType.NUMBER,
  },
  borderStyle: {
    value: 'solid',
    type: InputType.SELECT,
    items: ['solid', 'dashed'],
  },
  borderColor: {
    value: '#000000',
    type: InputType.COLOR,
  },
  fontSize: {
    value: '12px',
    placeholder: '12',
    type: InputType.NUMBER,
  },
  fontWeight: {
    value: '300',
    type: InputType.SELECT,
    items: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  fontFamily: {
    value: 'Roboto',
    type: InputType.SELECT,
    items: [
      'Arial',
      'Arial Black',
      'Bookman',
      'Candara',
      'Comic Sans MS',
      'Courier',
      'Courier New',
      'Garamond',
      'Georgia',
      'Impact',
      'Open Sans',
      'Palatino',
      'Roboto',
      'Times',
      'Times New Roman',
      'Verdana',
    ],
  },
  textAlign: {
    value: 'left',
    type: InputType.SELECT,
    items: ['left', 'center', 'right', 'justify'],
  },
  whiteSpace: {
    value: 'normal',
    type: InputType.SELECT,
    items: ['normal', 'pre'],
  },
  shown: {
    value: 'true',
    type: InputType.SELECT,
    items: ['true', 'false'],
  },
};

export const pxAttributes = new Set([
  'height',
  'width',
  'borderWidth',
  'fontSize',
]);

export const DEFAULT_SHARED_ATTRIBUTES: DefaultAttributesType =
    Object.keys(sharedAttributes)
        .reduce((attributes: DefaultAttributesType, key) => {
          if (key in pxAttributes) {
            attributes[key] = sharedAttributes[key].value + 'px';
            return attributes;
          }

          attributes[key] = sharedAttributes[key].value;
          return attributes;
        }, {});

export function getDefaultAttributes(attributes: AttributeMetaData):
    DefaultAttributesType {
  return Object.keys(attributes)
      .reduce((defaultAttributes: DefaultAttributesType, key) => {
        defaultAttributes[key] = attributes[key].value;
        return defaultAttributes;
      }, {});
}

export type UniqueAttributes =
    |typeof Label.DEFAULT_LABEL_ATTRIBUTES|
    typeof Button.DEFAULT_BUTTON_ATTRIBUTES|
    typeof Checkbox.DEFAULT_CHECKBOX_ATTRIBUTES|
    typeof Select.DEFAULT_SELECT_ATTRIBUTES|
    typeof Slider.DEFAULT_SLIDER_ATTRIBUTES|
    typeof Textbox.DEFAULT_TEXTBOX_ATTRIBUTES|
    typeof Chart.DEFAULT_CHART_ATTRIBUTES|typeof Map.DEFAULT_MAP_ATTRIBUTES;
