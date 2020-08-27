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
 * @fileoverview The empty-notice widget displays an icon and a message.
 */

import '@polymer/iron-icon/iron-icon.js';

import {css, customElement, html, LitElement, property} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';

export const EMPTY_NOTICE_ID = 'empty-notice';

@customElement('empty-notice')
export class EmptyNotice extends LitElement {
  static styles = css`
    #container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: var(--extra-loose) 0px;
      max-width: 350px;
    }

    #empty-notice-icon {
      color: var(--border-gray);
    }

    #empty-notice-message {
      color: var(--border-gray);
      text-align: center;
    }

    .small {
      --iron-icon-height: 25px;
      --iron-icon-width: 25px;
    }

    .small #empty-notice-message {
      font-size: 0.8rem;
    }

    .medium {
      --iron-icon-height: 50px;
      --iron-icon-width: 50px;
    }

    .medium #empty-notice-message {
      font-size: 1rem;
    }

    .large {
      --iron-icon-height: 75px;
      --iron-icon-width: 75px;
    }

    .x-large {
      --iron-icon-height: 100px;
      --iron-icon-width: 100px;
    }

    .x-large #empty-notice-message {
      font-size: 1.2rem;
    }

    .large #empty-notice-message {
      font-size: 1rem;
    }

    .bold {
      font-weight: 600;
    }
  `;

  /**
   * Additional custom styles.
   */
  @property({type: Object}) styles = {};

  /**
   * Message to be displayed.
   */
  @property({type: String}) message = '';

  /**
   * Iron icon id.
   */
  @property({type: String}) icon = '';

  /**
   * Sets icon and font size.
   */
  @property({type: String}) size = 'small';

  /**
   * Sets bold property of message.
   */
  @property({type: Boolean}) bold = false;

  render() {
    const {message, icon, size, bold, styles} = this;

    return html`
      <div id="container" class="${size}" style="${styleMap(styles)}">
        <iron-icon id="${EMPTY_NOTICE_ID}-icon" icon="${icon}"></iron-icon>
        <p id="${EMPTY_NOTICE_ID}-message" class="${classMap({bold})}">
          ${message}
        </p>
      </div>
    `;
  }

  getStyle(): object {
    return this.styles;
  }
}
