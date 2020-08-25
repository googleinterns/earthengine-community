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
 * @fileoverview This file tests the helper functions used in the redux store.
 */
import {expect} from '@open-wc/testing';

import {createTemplateStub} from '../../utils/test/helpers_test';
import {PalettePicker} from '../../widgets/palette-picker/palette-picker';
import {addDefaultStyles, applyPalette, DEFAULT_STYLES, getAttributePrefix, getBackgroundColor, removeWidgetHelper, updateWidgetAttribute,} from '../helpers';
import {SharedAttributes} from '../types/attributes';
import {AttributeType, PaletteNames} from '../types/enums';

suite('redux store helpers', () => {
  suite('palette changes', () => {
    test('background property set on panels', () => {
      const {widgets} = createTemplateStub();
      applyPalette(widgets, PaletteNames.RETRO);
      expect(widgets['panel-0'].style.backgroundColor)
          .to.equal(PalettePicker.palette.retro.backgroundColor);
    });

    test(
        'color property set on other widgets (i.e. labels, checkbox, etc...) with a transparent background.',
        () => {
          const {widgets} = createTemplateStub();
          applyPalette(widgets, PaletteNames.RETRO);
          expect(widgets['label-0'].style.color)
              .to.equal(PalettePicker.palette.retro.color);
          expect(widgets['label-0'].style.backgroundColor)
              .to.equal('#ffffff00');
        });

    test(
        'buttons have reverse color and background color properties',
        () => {
            // TODO: Uncomment this when button background color is supported on
            // the code editor.
            // const { widgets } = createTemplateStub();
            // applyPalette(widgets, PaletteNames.RETRO);
            // expect(widgets['button-0'].style.color).to.equal(
            //   PalettePicker.palette.retro.backgroundColor
            // );
            // expect(widgets['button-0'].style.backgroundColor).to.equal(
            //   PalettePicker.palette.retro.color
            // );
            // expect(widgets['button-0'].style.backgroundOpacity).to.equal('100');
        });

    test('mapStyles set on map', () => {
      const {widgets} = createTemplateStub();
      applyPalette(widgets, PaletteNames.RETRO);
      expect(widgets['map-0'].uniqueAttributes.mapStyles)
          .to.equal(PaletteNames.RETRO);
    });
  });

  suite('update widget attribute', () => {
    test('setting style value', () => {
      const payload = {
        attributeName: 'width',
        value: '60',
        id: 'label-0',
        attributeType: AttributeType.STYLE,
      };

      const template = createTemplateStub();

      template.widgets['label-0'].style.width = '80px';

      updateWidgetAttribute(template, payload);

      expect(template.widgets['label-0'].style.width).to.equal('60px');
    });

    test('setting attribute with unit', () => {
      const payload = {
        attributeName: 'width-unit',
        value: '%',
        id: 'label-0',
        attributeType: AttributeType.STYLE,
      };

      const template = createTemplateStub();

      template.widgets['label-0'].style.width = '80px';

      updateWidgetAttribute(template, payload);

      expect(template.widgets['label-0'].style.width).to.equal('80%');
    });
  });

  suite('default styles', () => {
    test('widget styles overwrite defaults', () => {
      const template = createTemplateStub();

      const customColor = '#ff0000';
      // Apply custom color and background color (default is #ffffff).
      template.widgets['label-0'].style.backgroundColor = customColor;
      template.widgets['label-0'].style.color = customColor;

      // Apply default styles
      addDefaultStyles(template);

      // Extract widgets.
      const {widgets} = template;

      // Make a clone of default styles.
      const defaults = Object.assign({}, DEFAULT_STYLES);

      // Since the template has a custom color and background color, it should
      // not be equal to the default.
      expect(widgets['label-0'].style.backgroundColor)
          .to.not.equal(defaults.backgroundColor);
      expect(widgets['label-0'].style.backgroundColor)
          .to.not.equal(defaults.color);

      // remove backgroundColor property from default clone.
      delete defaults.backgroundColor;
      delete defaults.color;

      // Check that all other properties match.
      for (const key in defaults) {
        expect(widgets['label-0'].style[key])
            .to.equal(defaults[key as SharedAttributes]);
      }

      // Check that color and background color are the same as the custom color
      // defined.
      expect(widgets['label-0'].style.backgroundColor).to.equal(customColor);
      expect(widgets['label-0'].style.color).to.equal(customColor);
    });
  });

  suite('get attribute prefix', () => {
    test('attribute containing `-`', () => {
      const attribute = 'width-unit';
      const prefix = getAttributePrefix(attribute);
      expect(prefix).to.equal('width');
    });

    test('attribute not containing `-`', () => {
      const attribute = 'width';
      const prefix = getAttributePrefix(attribute);
      expect(prefix).to.equal('width');
    });
  });

  suite('remove widget helper', () => {
    test('removes widget from template when reordering is false', () => {
      const template = createTemplateStub();
      const widgetId = 'label-0';
      removeWidgetHelper(template, false, widgetId);
      expect(template.widgets).to.not.have.property(widgetId);
      expect(template.widgets['panel-0'].children).to.not.include(widgetId);
    });

    test('removes widgetId from all children when reordering is true', () => {
      const template = createTemplateStub();
      const widgetId = 'label-0';
      removeWidgetHelper(template, true, widgetId);
      expect(template.widgets.hasOwnProperty(widgetId)).to.be.true;
      expect(template.widgets['panel-0'].children).to.not.include(widgetId);
    });
  });

  suite('background color', () => {
    test('valid backgroundColor with opacity', () => {
      const style = {
        backgroundColor: '#ffffffc6',
        backgroundOpacity: '100',
      };

      const backgroundColor = getBackgroundColor(style);
      expect(backgroundColor).to.equal('#ffffffff');
    });

    test('valid backgroundColor with empty opacity value', () => {
      const style = {
        backgroundColor: '#ffffff00',
        backgroundOpacity: '',
      };

      const backgroundColor = getBackgroundColor(style);
      expect(backgroundColor).to.equal('#ffffff00');
    });

    test('converts opacity to valid hex code', () => {
      const style = {
        backgroundColor: '#ffffff05',
        backgroundOpacity: '78',
      };

      const backgroundColor = getBackgroundColor(style);
      expect(backgroundColor).to.equal('#ffffffc6');
    });
  });
});
