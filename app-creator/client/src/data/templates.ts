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
 * @fileoverview Defines the TempaltesManager class.
 */

import {database, TemplateItem} from '../client/fetch-templates';

/**
 * TemplatesManager is a class that handles data fetching regarding template
 * data. It stores a local cache of templates to be used throughout the lifetime
 * of the application.
 */
class TemplatesManager {
  private templates: TemplateItem[] = [];

  getTemplates() {
    return this.templates;
  }

  /**
   * fetchTemplates fetches the templates from the datastore. If the
   * network request is not successful, it will fall back by setting
   * this.templates to backup templates stored on the client. It will also store
   * an error to be handled by the consumer.
   */
  async fetchTemplates(forceReload: boolean = false):
      Promise<TemplateItem[]|void> {
    /**
     * If we have already fetched the templates, then
     * we will just return what we have stored.
     */
    if (this.templates.length > 0) {
      return this.templates;
    }

    try {
      const response = await fetch('/api/v1/templates');

      this.templates = await response.json();

      return this.templates;
    } catch (e) {
      /**
       * If a request fails, with the forceReload flag set to true,
       * we will try again one more time.
       */
      if (forceReload) {
        await this.fetchTemplates(false);
      } else {
        this.templates = database;
        throw e;
      }
    }
  }

  setTemplates(templates: TemplateItem[]) {
    this.templates = templates;
  }

  addTemplates(templates: TemplateItem[]) {
    this.templates.push(...templates);
  }
}

export const templatesManager = new TemplatesManager();
