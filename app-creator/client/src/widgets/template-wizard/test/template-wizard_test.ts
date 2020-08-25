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
 * @fileoverview This file tests the template-wizard widget.
 */
import { TemplateWizard } from '../template-wizard';
import {
  fixture,
  html,
  expect,
  assert,
  elementUpdated,
} from '@open-wc/testing';
import { PaperButtonElement } from '@polymer/paper-button';

suite('template-wizard', () => {
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

  suite('continue button', () => {
    test('continue button is disabled by default', async () => {
      const templateWizard = await fixture(
        html`<template-wizard></template-wizard>`
      );

      // Find continue button.
      const continueButton = templateWizard.shadowRoot?.querySelector(
        '#continue-button'
      ) as PaperButtonElement;

      if (!continueButton) {
        // Force fail if continue button is not found.
        assert.fail('continue button not found');
      }

      expect(continueButton.disabled).to.equal(true);
    });

    test('continue button remains disabled when only template name is set', async () => {
      const templateWizard = (await fixture(
        html`<template-wizard></template-wizard>`
      )) as TemplateWizard;

      // Set template name.
      templateWizard.config.name = 'test app';
      await elementUpdated(templateWizard);

      // Find continue button.
      const continueButton = templateWizard.shadowRoot?.querySelector(
        '#continue-button'
      ) as PaperButtonElement;

      if (!continueButton) {
        // Force fail if continue button is not found.
        assert.fail('continue button not found');
      }

      expect(continueButton.disabled).to.equal(true);
    });

    test('continue button remains disabled when only selectTemplateID is set', async () => {
      const templateWizard = (await fixture(
        html`<template-wizard></template-wizard>`
      )) as TemplateWizard;

      // Set selectedTemplateID.
      templateWizard.selectedTemplateID = 'left-side-panel';
      await elementUpdated(templateWizard);

      // Find continue button.
      const continueButton = templateWizard.shadowRoot?.querySelector(
        '#continue-button'
      ) as PaperButtonElement;

      if (!continueButton) {
        // Force fail if continue button is not found.
        assert.fail('continue button not found');
      }

      expect(continueButton.disabled).to.equal(true);
    });

    test('continue button is enabled when both name and templates are filled', async () => {
      const templateWizard = (await fixture(
        html`<template-wizard></template-wizard>`
      )) as TemplateWizard;

      // Set selected template id.
      templateWizard.config.name = 'test app';
      templateWizard.selectedTemplateID = 'left-side-panel';
      await elementUpdated(templateWizard);

      // Find continue button.
      const continueButton = templateWizard.shadowRoot?.querySelector(
        '#continue-button'
      ) as PaperButtonElement;

      if (!continueButton) {
        // Force fail if continue button is not found.
        assert.fail('continue button not found');
      }

      expect(continueButton.disabled).to.equal(false);
    });
  });
});
