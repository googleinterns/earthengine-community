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
 * @fileoverview This file tests the helper functions defined in utils.
 */

import {expect} from '@open-wc/testing';

import {AppCreatorStore} from '../../redux/reducer';
import {PaletteNames} from '../../redux/types/enums';
import {camelCaseToTitleCase, deepCloneTemplate, generateRandomId, getIdPrefixLastIndex, getWidgetType,} from '../helpers';

suite('util helpers', () => {
  suite('deep cloning templates', () => {
    test('clones all values', () => {
      const template = createTemplateStub();
      const templateCopy = deepCloneTemplate(template);

      expect(templateCopy).deep.equal(template);
    });

    test('creates new references for object types (including arrays)', () => {
      const template = createTemplateStub();
      const templateCopy = deepCloneTemplate(template);

      expect(templateCopy.widgets['panel-0'].children)
          .not.equal(template.widgets['panel-0'].children);
    });

    test('skips refs by default', () => {
      const template = createTemplateStub();
      template.widgets['label-0'].widgetRef =
          document.createElement('ui-label');
      const templateCopy = deepCloneTemplate(template);

      expect(templateCopy.widgets['label-0'].widgetRef).to.not.exist;
    });

    test('does not skip refs when the skipRefs argument is false', () => {
      const template = createTemplateStub();
      const label = document.createElement('ui-label');
      template.widgets['label-0'].widgetRef = label;
      const templateCopy = deepCloneTemplate(template, false);

      expect(templateCopy.widgets['label-0'].widgetRef).to.equal(label);
    });
  });

  suite('camel case to title case', () => {
    test('correctly transforms camel case to title', () => {
      const attribute = 'targetUrl';
      const title = camelCaseToTitleCase(attribute);
      expect(title).to.equal('Target Url');
    });
  });

  suite('get widget type', () => {
    test('widget type from id', () => {
      const id = 'label-0';
      const type = getWidgetType(id);
      expect(type).to.equal('label');
    });

    test('id not containing `-`', () => {
      const id = 'label';
      const type = getWidgetType(id);
      expect(type).to.equal('label');
    });
  });

  suite('get id prefix from last index of `-`', () => {
    test('extracts prefix before last `-`', () => {
      const id = 'label-wrapper-0';
      const type = getIdPrefixLastIndex(id);
      expect(type).to.equal('label-wrapper');
    });

    test('id not containing `-`', () => {
      const id = 'label';
      const type = getWidgetType(id);
      expect(type).to.equal('label');
    });
  });

  suite('random id generator', () => {
    test('id generated has a length of 32', () => {
      const randomId = generateRandomId();
      expect(randomId.length).to.equal(32);
    });

    test('id generated contains alphanumeric characters', () => {
      const randomId = generateRandomId();
      expect(/^[A-Za-z0-9]+$/.test(randomId)).to.be.true;
    });
  });
});

export function createTemplateStub(): AppCreatorStore['template'] {
  return {
    widgets: {
      'panel-0': {
        children: ['label-0'],
        style: {
          backgroundColor: '#000000',
          color: '#ffffff',
        },
      },
      'label-0': {
        id: 'label-0',
        children: [],
        uniqueAttributes: {},
        style: {
          backgroundColor: '#000000',
          color: '#ffffff',
        },
      },
      'button-0': {
        id: 'button-0',
        children: [],
        uniqueAttributes: {},
        style: {
          backgroundColor: '#000000',
          color: '#ffffff',
        },
      },
      'map-0': {
        id: 'map-0',
        children: [],
        uniqueAttributes: {
          mapStyles: PaletteNames.AUBERGINE,
        },
        style: {
          backgroundColor: '#ffffff',
          color: '#ffffff',
        },
      },
    },
  };
}
