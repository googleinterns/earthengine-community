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
 * @fileoverview This tests the ui-select widget.
 */

import {assert, expect, fixture, html} from '@open-wc/testing';

import {Select} from '../ui-select';

suite('ui-select', () => {
  test('is defined', () => {
    const el = document.createElement('ui-select');
    assert.instanceOf(el, Select);
  });

  test('renders widget with correct value', async () => {
    const value = 'Item 1';
    const el = await fixture(html`<ui-select items="Item 1, Item 2" } value="${
        value}"></ui-select>`);
    expect(el.shadowRoot!.textContent).to.include(value);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<ui-select></ui-select>`);
    expect(el.tagName).to.equal('UI-SELECT');
  });
});
