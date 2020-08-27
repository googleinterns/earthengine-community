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
 * @fileoverview This file tests the ui-checkbox widget.
 */

import {assert, expect, fixture, html} from '@open-wc/testing';

import {Checkbox} from '../ui-checkbox';

suite('ui-checkbox', () => {
  test('is defined', () => {
    const el = document.createElement('ui-checkbox');
    assert.instanceOf(el, Checkbox);
  });

  test('renders widget with correct label', async () => {
    const label = 'Item';
    const el =
        await fixture(html`<ui-checkbox label="${label}"></ui-checkbox>`);
    expect(el.shadowRoot!.textContent).to.include(label);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<ui-checkbox></ui-checkbox>`);
    expect(el.tagName).to.equal('UI-CHECKBOX');
  });
});
