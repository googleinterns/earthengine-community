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
 * @fileoverview The template-card widget allows users to switch to a new
 * template.
 */

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

import {css, customElement, html, LitElement, property} from 'lit-element';
import {nothing} from 'lit-html';

import {noop} from '../../utils/helpers';

@customElement('template-card')
export class TemplateCard extends LitElement {
  static styles = css`
    .card-image {
      height: 120px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-bottom: var(--light-border);
      overflow: hidden;
    }

    .card-container {
      border: var(--light-border);
      border-radius: var(--tight);
      overflow: hidden;
      margin-bottom: var(--tight);
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
      padding: var(--extra-tight);
    }

    h4 {
      margin: var(--tight) 0px 0px var(--tight);
      font-weight: 400;
    }
  `;

  /**
   * Template id. Used to determine if button should be disabled or not.
   */
  @property({type: String}) id = '';

  /**
   * Template title.
   */
  @property({type: String}) title = '';

  /**
   * Sets card image.
   */
  @property({type: String}) imageUrl = '';

  /**
   * Callback triggered on select button click.
   */
  @property({type: Object}) onSelection: VoidFunction = noop;

  /**
   * Disables button if true and sets label to 'selected'.
   */
  @property({type: Boolean}) selected = false;

  /**
   * Hides title when false.
   */
  @property({type: Boolean}) showTitle = false;

  render() {
    const {imageUrl, title, showTitle, selected, onSelection} = this;
    const buttonLabel = selected ? 'Selected' : 'Select';

    const titleMarkup = showTitle ? html`<h4>${title}</h4>` : nothing;
    return html`
      <div class="card-container">
        <div
          class="card-image"
          style="background-image: url(${imageUrl});"
        ></div>
        ${titleMarkup}
        <div class="card-actions">
          <paper-button
            @click=${() => {
      onSelection();
      this.requestUpdate();
    }}
            ?disabled=${selected}
          >
            ${buttonLabel}
          </paper-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'template-card': TemplateCard;
  }
}
