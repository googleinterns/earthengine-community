/**
 *  @fileoverview This file tests the templates-tab widget.
 */
import { TemplatesTab } from '../templates-tab';
import { fixture, html, expect, assert } from '@open-wc/testing';
import { DeviceType } from '../../../redux/types/enums';
import '../templates-tab/templates-tab';

suite('templates-tab', () => {
  test('is defined', () => {
    const el = document.createElement('templates-tab');
    assert.instanceOf(el, TemplatesTab);
  });

  test('renders widget', async () => {
    const el = await fixture(html`<templates-tab></templates-tab>`);
    expect(el.shadowRoot!.childNodes.length).to.be.greaterThan(0);
  });

  suite('filter template cards', () => {
    test('Empty query from all devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        '',
        DeviceType.all
      );
      expect(result.length).to.equal(templatesStub.length);
    });

    test('Sub query from all devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        'le',
        DeviceType.all
      );
      expect(result.length).to.equal(
        templatesStub.filter(({ name }) => name.includes('Le')).length
      );
    });

    test('Sub query from mobile devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        'le',
        DeviceType.mobile
      );
      expect(result.length).to.equal(1);
    });
  });
});

const templatesStub = [
  {
    id: '0',
    name: 'Left Side Panel',
    markup: html``,
    device: DeviceType.desktop,
  },
  {
    id: '1',
    name: 'Left Drawer Mobile',
    markup: html``,
    device: DeviceType.mobile,
  },
  {
    id: '2',
    name: 'Right Side Panel',
    markup: html``,
    device: DeviceType.desktop,
  },
];
