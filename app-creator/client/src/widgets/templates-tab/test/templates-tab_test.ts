/**
 *  @fileoverview This file tests the templates-tab widget.
 */
import { TemplatesTab } from '../templates-tab';
import { html, expect, assert } from '@open-wc/testing';
import { DeviceType } from '../../../redux/types/enums';

suite('templates-tab', () => {
  test('is defined', () => {
    const el = document.createElement('templates-tab');
    assert.instanceOf(el, TemplatesTab);
  });

  suite('filter template cards', () => {
    test('Empty query for all devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        '',
        DeviceType.ALL
      );
      expect(result.length).to.equal(templatesStub.length);
    });

    test('Sub query for all devices', () => {
      const query = 'le';
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        query,
        DeviceType.ALL
      );
      expect(result.length).to.equal(
        templatesStub.filter(({ name }) => name.toLowerCase().includes(query))
          .length
      );
    });

    test('Empty query for mobile devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        '',
        DeviceType.MOBILE
      );
      expect(result.length).to.equal(
        templatesStub.filter(({ device }) => device === DeviceType.MOBILE)
          .length
      );
    });

    test('Sub query for mobile devices', () => {
      const query = 'le';
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        query,
        DeviceType.MOBILE
      );
      expect(result.length).to.equal(
        templatesStub.filter(
          ({ device, name }) =>
            name.toLowerCase().includes(query) && device === DeviceType.MOBILE
        ).length
      );
    });

    test('Empty query for desktop devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        '',
        DeviceType.DESKTOP
      );
      expect(result.length).to.equal(
        templatesStub.filter(({ device }) => device === DeviceType.DESKTOP)
          .length
      );
    });

    test('Sub query for desktop devices', () => {
      const query = 'le';
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        query,
        DeviceType.DESKTOP
      );
      expect(result.length).to.equal(
        templatesStub.filter(
          ({ device, name }) =>
            name.toLowerCase().includes(query) && device === DeviceType.DESKTOP
        ).length
      );
    });
  });

  suite('filter template cards', () => {
    test('Empty query from all devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        '',
        DeviceType.ALL
      );
      expect(result.length).to.equal(templatesStub.length);
    });

    test('Sub query from all devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        'le',
        DeviceType.ALL
      );
      expect(result.length).to.equal(
        templatesStub.filter(({ name }) => name.includes('Le')).length
      );
    });

    test('Sub query from mobile devices', () => {
      const result = TemplatesTab.filterTemplates(
        templatesStub,
        'le',
        DeviceType.MOBILE
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
    device: DeviceType.DESKTOP,
  },
  {
    id: '1',
    name: 'Left Drawer Mobile',
    markup: html``,
    device: DeviceType.MOBILE,
  },
  {
    id: '2',
    name: 'Right Side Panel',
    markup: html``,
    device: DeviceType.DESKTOP,
  },
];
