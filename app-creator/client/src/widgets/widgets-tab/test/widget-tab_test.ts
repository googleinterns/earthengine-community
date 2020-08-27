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
 * @fileoverview This file tests the widgets-tab.
 */

import {assert, expect, fixture, html} from '@open-wc/testing';

import {WidgetsTab} from '../widgets-tab';

suite('widgets-tab', () => {
  test('is defined', () => {
    const el = document.createElement('widgets-tab');
    assert.instanceOf(el, WidgetsTab);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<widgets-tab></widgets-tab>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('filtering widgets', async () => {
    const widgetsTab = new WidgetsTab();
    const checkbox = Object.assign(
        {}, WidgetsTab.widgets.find(({name}) => name === 'checkbox'));
    expect(widgetsTab.filterWidgets('')).to.deep.equal(WidgetsTab.widgets);
    expect(widgetsTab.filterWidgets('does not exist')).to.deep.equal([]);
    expect(widgetsTab.filterWidgets('checkbox')).to.deep.equal([checkbox]);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<widget-tab></widget-tab>`);
    expect(el.tagName).to.equal('WIDGET-TAB');
  });
});
