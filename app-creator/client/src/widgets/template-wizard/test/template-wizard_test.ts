/**
 *  @fileoverview This file tests the template-wizard widget.
 */
import { TemplateWizard } from '../template-wizard';
import { fixture, html, expect, assert } from '@open-wc/testing';

suite('templates-tab', () => {
  test('is defined', () => {
    const el = document.createElement('template-wizard');
    assert.instanceOf(el, TemplateWizard);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<template-wizard></template-wizard>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  test('renders correct tag', async () => {
    const el = await fixture(html`<template-wizard></template-wizard>`);
    expect(el.tagName).to.equal('TEMPLATE-WIZARD');
  });
});
