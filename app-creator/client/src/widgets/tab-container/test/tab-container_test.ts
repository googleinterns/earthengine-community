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
 * @fileoverview This file tests the tab-container widget.
 */

import {assert, expect, fixture, html} from '@open-wc/testing';

import {TabContainer} from '../tab-container';

suite('tab-container', () => {
  test('is defined', () => {
    const el = document.createElement('tab-container');
    assert.instanceOf(el, TabContainer);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<tab-container></tab-container>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders title', async () => {
    const title = 'Widgets';
    const el =
        await fixture(html`<tab-container title="${title}"></tab-container>`);
    expect(el.shadowRoot!.textContent).to.include(title);
  });

  test('renders h5 element with title', async () => {
    const title = 'Widgets';
    const el =
        await fixture(html`<tab-container title="${title}"></tab-container>`);
    expect(el.shadowRoot!.textContent).to.include(title);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<tab-container></tab-container>`);
    expect(el.tagName).to.equal('TAB-CONTAINER');
  });
});
