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
 * @fileoverview The ui-checkbox widget lets users add a checkbox component to
 * their templates.
 */

import '@polymer/paper-checkbox/paper-checkbox.js';

import {css, customElement, html, LitElement, property} from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map';

import {AttributeMetaData, DEFAULT_SHARED_ATTRIBUTES, DefaultAttributesType, getDefaultAttributes,} from '../../redux/types/attributes';
import {InputType} from '../../redux/types/enums';

@customElement('ui-checkbox')
export class Checkbox extends LitElement {
  static styles = css`
    paper-checkbox {
      margin: var(--tight);
      font-size: 0.8rem;
    }
  `;

  static attributes: AttributeMetaData = {
    label: {
      value: 'Item',
      placeholder: 'Enter label',
      type: InputType.TEXT,
    },
    value: {
      value: 'false',
      type: InputType.SELECT,
      items: ['true', 'false'],
    },
    disabled: {
      value: 'false',
      type: InputType.SELECT,
      items: ['true', 'false'],
    },
  };

  static DEFAULT_CHECKBOX_ATTRIBUTES: DefaultAttributesType =
      getDefaultAttributes(Checkbox.attributes);

  /**
   * Additional custom styles.
   */
  @property({type: Object}) styles = DEFAULT_SHARED_ATTRIBUTES;

  /**
   * Sets checkbox label.
   */
  @property({type: String}) label = '';

  /**
   * If true, the user cannot interact with this element.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * If true, checkbox displays a checkmark.
   */
  @property({type: Boolean}) checked = false;

  render() {
    const {label, styles, checked, disabled} = this;
    return html`
      <paper-checkbox
        style=${styleMap(styles)}
        ?checked=${checked}
        ?disabled=${disabled}
        noink
      >
        ${label}
      </paper-checkbox>
    `;
  }

  setAttribute(key: string, value: string) {
    switch (key) {
      case 'label':
        this.label = value;
        break;
      case 'value':
        this.checked = value === 'true';
        break;
      case 'disabled':
        this.disabled = value === 'true';
        break;
    }

    this.requestUpdate();
  }

  getChecked() {
    return this.checked;
  }

  getDisabled(): boolean {
    return this.disabled;
  }

  getStyle(): object {
    return this.styles;
  }

  setStyle(style: {[key: string]: string}) {
    this.styles = style;
    this.requestUpdate();
  }
}
