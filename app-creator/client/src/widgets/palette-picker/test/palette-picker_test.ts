/**
 *  @fileoverview This file tests the palette-picker widget.
 */
import { PalettePicker } from '../palette-picker';
import { fixture, html, expect, assert, oneEvent } from '@open-wc/testing';
import { PaletteNames } from '../../../redux/types/enums';

suite('palette-picker', () => {
  test('is defined', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;
    assert.instanceOf(picker, PalettePicker);
  });

  test('renders widget', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;
    expect(picker.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders correct tag', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;
    expect(picker.tagName).to.equal('PALETTE-PICKER');
  });

  test('displays title by default', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;

    // Find inputHeader containing title.
    const inputHeader = picker.shadowRoot?.querySelector('#input-header');

    // Get showTitle property.
    const showTitle = picker.showTitle;

    expect(showTitle).to.equal(true);
    expect(inputHeader).to.exist;
  });

  test('hides title if showTitle is false', async () => {
    const picker = (await fixture(
      html`<palette-picker .showTitle=${false}></palette-picker>`
    )) as PalettePicker;

    // Find inputHeader containing title.
    const inputHeader = picker.shadowRoot?.querySelector('#input-header');

    // Get showTitle property.
    const showTitle = picker.showTitle;

    expect(showTitle).to.equal(false);
    expect(inputHeader).to.not.exist;
  });

  test('palette selection with valid palette', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;

    // Find select element.
    const select = picker.shadowRoot?.querySelector('select');
    if (!select) {
      return;
    }

    // Set value to new palette and dispatch change event.
    select.value = PaletteNames.aubergine;
    setTimeout(() => select.dispatchEvent(new Event('change')));

    // Listen to palette-change custom event triggered by picker.
    const {
      detail: { selectedPalette },
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the correct template.
    expect(selectedPalette).to.equal(PaletteNames.aubergine);
    expect(picker.selectedPalette).to.equal(PaletteNames.aubergine);
  });

  test('palette selection with invalid palette', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;

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
      detail: { selectedPalette },
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the correct template.
    expect(selectedPalette).to.not.equal(invalidPalette);
    expect(picker.selectedPalette).to.not.equal(invalidPalette);
  });

  test('light palette selected by default', async () => {
    const picker = (await fixture(
      html`<palette-picker></palette-picker>`
    )) as PalettePicker;

    // Find select element.
    const select = picker.shadowRoot?.querySelector('select');
    if (!select) {
      return;
    }

    // Set value to new palette and dispatch change event.
    setTimeout(() => select.dispatchEvent(new Event('change')));

    // Listen to palette-change custom event triggered by picker.
    const {
      detail: { selectedPalette },
    } = await oneEvent(picker, 'palette-change');

    // assert that the selectedPalette property and the event detail match the correct template.
    expect(selectedPalette).to.equal(PaletteNames.light);
    expect(picker.selectedPalette).to.equal(PaletteNames.light);
  });
});
