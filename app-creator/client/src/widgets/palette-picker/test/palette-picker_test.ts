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
 * @fileoverview This file tests the palette-picker widget.
 */

import {assert, expect, fixture, html, oneEvent} from '@open-wc/testing';

import {PaletteNames} from '../../../redux/types/enums';
import {PalettePicker} from '../palette-picker';

suite('palette-picker', () => {
  test('is defined', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;
    assert.instanceOf(picker, PalettePicker);
  });

  test('renders widget', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;
    expect(picker.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders correct tag', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;
    expect(picker.tagName).to.equal('PALETTE-PICKER');
  });

  test('displays title by default', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;

    // Find inputHeader containing title.
    const inputHeader = picker.shadowRoot?.querySelector('#input-header');

    // Get showTitle property.
    const showTitle = picker.showTitle;

    expect(showTitle).to.be.true;
    expect(inputHeader).to.exist;
  });

  test('hides title if showTitle is false', async () => {
    const picker =
        (await fixture(
            html`<palette-picker .showTitle=${false}></palette-picker>`)) as
        PalettePicker;

    // Find inputHeader containing title.
    const inputHeader = picker.shadowRoot?.querySelector('#input-header');

    // Get showTitle property.
    const showTitle = picker.showTitle;

    expect(showTitle).to.be.false;
    expect(inputHeader).to.not.exist;
  });

  test('palette selection with valid palette', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;

    // Find select element.
    const select = picker.shadowRoot?.querySelector('select');
    if (!select) {
      return;
    }

    // Set value to new palette and dispatch change event.
    select.value = PaletteNames.AUBERGINE;
    setTimeout(() => select.dispatchEvent(new Event('change')));

    // Listen to palette-change custom event triggered by picker.
    const {
      detail: {selectedPalette},
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the
    // correct template.
    expect(selectedPalette).to.equal(PaletteNames.AUBERGINE);
    expect(picker.selectedPalette).to.equal(PaletteNames.AUBERGINE);
  });

  test('palette selection with invalid palette', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;

    // Find select element.
    const select = picker.shadowRoot?.querySelector('select');
    if (!select) {
      return;
    }

    const invalidPalette = 'invalid palette';

    // Set value to new palette and dispatch change event.
    select.value = invalidPalette;
    setTimeout(() => select.dispatchEvent(new Event('change')));

    // Listen to palette-change custom event triggered by picker.
    const {
      detail: {selectedPalette},
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the
    // correct template.
    expect(selectedPalette).to.not.equal(invalidPalette);
    expect(picker.selectedPalette).to.not.equal(invalidPalette);
  });

  test('light palette selected by default', async () => {
    const picker = (await fixture(html`<palette-picker></palette-picker>`)) as
        PalettePicker;

    // Find select element.
    const select = picker.shadowRoot?.querySelector('select');
    if (!select) {
      return;
    }

    // Set value to new palette and dispatch change event.
    setTimeout(() => select.dispatchEvent(new Event('change')));

    // Listen to palette-change custom event triggered by picker.
    const {
      detail: {selectedPalette},
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the
    // correct template.
    expect(selectedPalette).to.equal(PaletteNames.LIGHT);
    expect(picker.selectedPalette).to.equal(PaletteNames.LIGHT);
  });
});
