/**
 *  @fileoverview This file tests the scratch-panel widget.
 */
import { ScratchPanel } from '../scratch-panel';
import { fixture, html, expect, assert } from '@open-wc/testing';

suite('scratch-panel', () => {
  test('is defined', () => {
    const el = document.createElement('scratch-panel');
    assert.instanceOf(el, ScratchPanel);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<scratch-panel></scratch-panel>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<scratch-panel></scratch-panel>`);
    expect(el.tagName).to.equal('SCRATCH-PANEL');
  });
});
