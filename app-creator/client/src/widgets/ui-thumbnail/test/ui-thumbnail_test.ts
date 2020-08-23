/**
 *  @fileoverview This file tests the ui-thumbnail widget.
 */
import { Thumbnail } from '../ui-thumbnail';
import { fixture, html, expect, assert } from '@open-wc/testing';

suite('ui-thumbnail', () => {
  test('is defined', () => {
    const el = document.createElement('ui-thumbnail');
    assert.instanceOf(el, Thumbnail);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<ui-thumbnail></ui-thumbnail>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<ui-thumbnail></ui-thumbnail>`);
    expect(el.tagName).to.equal('UI-THUMBNAIL');
  });
});
