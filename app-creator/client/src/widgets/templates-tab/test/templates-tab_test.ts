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
 * @fileoverview This file tests the templates-tab widget.
 */

import {assert, expect, html} from '@open-wc/testing';

import {DeviceType} from '../../../redux/types/enums';
import {TemplatesTab} from '../templates-tab';

suite('templates-tab', () => {
  test('is defined', () => {
    const el = document.createElement('templates-tab');
    assert.instanceOf(el, TemplatesTab);
  });

  suite('filter template cards', () => {
    test('Empty query for all devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, '', DeviceType.ALL);
      expect(result.length).to.equal(templatesStub.length);
    });

    test('Sub query for all devices', () => {
      const query = 'le';
      const result =
          TemplatesTab.filterTemplates(templatesStub, query, DeviceType.ALL);
      expect(result.length)
          .to.equal(templatesStub
                        .filter(({name}) => name.toLowerCase().includes(query))
                        .length);
    });

    test('Empty query for mobile devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, '', DeviceType.MOBILE);
      expect(result.length)
          .to.equal(
              templatesStub.filter(({device}) => device === DeviceType.MOBILE)
                  .length);
    });

    test('Sub query for mobile devices', () => {
      const query = 'le';
      const result =
          TemplatesTab.filterTemplates(templatesStub, query, DeviceType.MOBILE);
      expect(result.length)
          .to.equal(
              templatesStub
                  .filter(
                      ({device, name}) => name.toLowerCase().includes(query) &&
                          device === DeviceType.MOBILE)
                  .length);
    });

    test('Empty query for desktop devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, '', DeviceType.DESKTOP);
      expect(result.length)
          .to.equal(
              templatesStub.filter(({device}) => device === DeviceType.DESKTOP)
                  .length);
    });

    test('Sub query for desktop devices', () => {
      const query = 'le';
      const result = TemplatesTab.filterTemplates(
          templatesStub, query, DeviceType.DESKTOP);
      expect(result.length)
          .to.equal(
              templatesStub
                  .filter(
                      ({device, name}) => name.toLowerCase().includes(query) &&
                          device === DeviceType.DESKTOP)
                  .length);
    });
  });

  suite('filter template cards', () => {
    test('Empty query from all devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, '', DeviceType.ALL);
      expect(result.length).to.equal(templatesStub.length);
    });

    test('Sub query from all devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, 'le', DeviceType.ALL);
      expect(result.length)
          .to.equal(
              templatesStub.filter(({name}) => name.includes('Le')).length);
    });

    test('Sub query from mobile devices', () => {
      const result =
          TemplatesTab.filterTemplates(templatesStub, 'le', DeviceType.MOBILE);
      expect(result.length).to.equal(1);
    });
  });
});

const templatesStub = [
  {
    id: '0',
    name: 'Left Side Panel',
    markup: html``,
    device: DeviceType.DESKTOP,
  },
  {
    id: '1',
    name: 'Left Drawer Mobile',
    markup: html``,
    device: DeviceType.MOBILE,
  },
  {
    id: '2',
    name: 'Right Side Panel',
    markup: html``,
    device: DeviceType.DESKTOP,
  },
];
