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
 * @fileoverview This file tests the attributes-tab widget.
 */
import { AttributesTab } from '../attributes-tab';
import { fixture, html, expect, assert } from '@open-wc/testing';
import { DEFAULT_STYLES } from '../../../redux/helpers';
import { SharedAttributes } from '../../../redux/types/attributes';

suite('attributes-tab', () => {
  test('is defined', () => {
    const el = document.createElement('attributes-tab');
    assert.instanceOf(el, AttributesTab);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<attributes-tab></attributes-tab>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders empty notice when editing widget is null', async () => {
    const el = await fixture(html`<attributes-tab></attributes-tab>`);
    expect(el.shadowRoot!.querySelector('empty-notice')).to.exist;
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<attributes-tab></attributes-tab>`);
    expect(el.tagName).to.equal('ATTRIBUTES-TAB');
  });

  test('disabled styles are not part of style attributes', async () => {
    const attributesTab = new AttributesTab();
    const styles: { [key in SharedAttributes]: string } = Object.assign(
      {},
      DEFAULT_STYLES
    );

    const disabledStyles = new Set<SharedAttributes>([
      'backgroundColor',
      'fontSize',
      'fontFamily',
      'fontWeight',
    ]);

    const filteredStyles = attributesTab.filterDisabledStyles(
      styles,
      disabledStyles
    );

    expect(filteredStyles).deep.equal({
      height: 'px',
      width: 'px',
      padding: '0px',
      margin: '8px',
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#000000',
      color: '#000000',
      backgroundOpacity: '0',
      textAlign: 'left',
      whiteSpace: 'normal',
      shown: 'true',
    });
  });
});
