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
 * @fileoverview The tab-container is used as a wrapper for the different tabs
 * in the actions-panel.
 */

import {css, customElement, html, LitElement, property} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';

@customElement('tab-container')
export class TabContainer extends LitElement {
  /**
   * Additional custom styles.
   */
  static styles = css`
    #container {
      height: calc(100vh - 47.6px - 73px);
      width: calc(var(--actions-panel-width) - 2 * var(--regular));
      overflow-y: auto;
      padding: var(--regular);
    }

    h5 {
      margin-top: var(--extra-tight);
      margin-bottom: var(--regular);
    }
  `;

  /**
   * Additional custom styles.
   */
  @property({type: Object}) styles = {};

  /**
   * The title of the tab container.
   */
  @property({type: String}) title = '';

  render() {
    const {title, styles} = this;
    return html`
      <div id="container" style=${styleMap(styles)}>
        <h5>${title}</h5>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tab-container': TabContainer;
  }
}
