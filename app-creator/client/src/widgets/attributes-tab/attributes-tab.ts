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
 * @fileoverview The attributes-tab widget contains the different
 * attributes that a user can edit for a particular element.
 */

import '../tab-container/tab-container';
import '@polymer/paper-dialog/paper-dialog.js';
import '../empty-notice/empty-notice';

import {PaperDialogElement} from '@polymer/paper-dialog/paper-dialog.js';
import {css, customElement, html, LitElement, property} from 'lit-element';
import {nothing, render, TemplateResult} from 'lit-html';
import {connect} from 'pwa-helpers';

import {updateWidgetMetaData} from '../../redux/actions.js';
import {AppCreatorStore} from '../../redux/reducer';
import {store} from '../../redux/store';
import {AttributeMetaData, sharedAttributes, Tooltip, UniqueAttributes,} from '../../redux/types/attributes.js';
import {AttributeType, EventType, InputType, WidgetType,} from '../../redux/types/enums.js';
import {camelCaseToTitleCase, getWidgetType} from '../../utils/helpers.js';
import {Button} from '../ui-button/ui-button.js';
import {Chart} from '../ui-chart/ui-chart.js';
import {Checkbox} from '../ui-checkbox/ui-checkbox.js';
import {Label} from '../ui-label/ui-label.js';
import {Map} from '../ui-map/ui-map.js';
import {Select} from '../ui-select/ui-select.js';
import {Slider} from '../ui-slider/ui-slider.js';
import {Textbox} from '../ui-textbox/ui-textbox.js';

@customElement('attributes-tab') export class AttributesTab extends connect
(store)(LitElement) {
  static styles = css`
    input {
      margin: var(--tight) 0px;
    }

    .input-label {
      margin: 0px 0px;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent-color);
    }

    .attribute-input-container {
      margin: var(--extra-tight) 0px;
      margin-right: 0px;
    }

    .attribute-input {
      border: var(--light-border);
      padding: var(--extra-tight);
      -webkit-border-radius: var(--extra-tight);
      border-radius: var(--extra-tight);
      width: 100%;
      resize: none;
      font-family: inherit;
      background-color: var(--primary-color);
      margin: var(--extra-tight) 0px;
    }

    .attribute-input:focus {
      border-color: var(--accent-color);
      outline: none;
    }

    .text-input {
      width: 96.5%;
    }

    .input-container {
      display: flex;
      width: 100%;
    }

    .unit-input {
      margin: 0px 0px 0px var(--extra-tight);
      border: var(--light-border);
      padding: var(--extra-tight);
      -webkit-border-radius: var(--extra-tight);
      border-radius: var(--extra-tight);
      resize: none;
      font-family: inherit;
      background-color: var(--primary-color);
      height: 26px;
      margin-top: var(--extra-tight);
    }

    .color-input {
      width: 50px;
    }

    .input-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .info-icon {
      margin: 0;
      padding: 0;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 0.5px solid var(--accent-color);
      background-color: var(--primary-color);
      color: var(--accent-color);
      font-size: 0.8rem;
      font-family: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .info-icon:hover {
      opacity: 0.5;
    }

    .info-icon:after {
      content: 'i';
      color: var(--accent-color);
    }

    .tooltip-dialog {
      border-radius: var(--tight);
      padding: var(--regular);
      background-color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .tooltip-text {
      margin: 0px;
      padding: 0px;
      color: var(--accent-color);
    }

    a {
      text-decoration: underline;
      color: var(--accent-color);
    }

    a:hover {
      opacity: 0.5;
    }
  `;

  stateChanged(state: AppCreatorStore) {
    if (state.editingElement !== this.editingWidget) {
      this.editingWidget = state.editingElement;

      const slot = this.shadowRoot?.querySelector('tab-container')
                       ?.querySelector('slot')!;

      if (slot == null) {
        return;
      }

      const uniqueAttributesMarkup = this.getUniqueAttributes();
      const styleAttributesMarkup = this.getStyleAttributes();

      render(html``, slot);

      render(
          html`${uniqueAttributesMarkup} ${styleAttributesMarkup}
        ${this.editingWidget ? nothing : AttributesTab.emptyNotice}`,
          slot);
    }
  }

  /**
   * Sets the search query.
   */
  @property({type: String}) query = '';

  /**
   * Widget currently being edited.
   */
  editingWidget: Element|null =
      store.getState().eventType === EventType.EDITING ?
      store.getState().editingElement :
      null;

  private openTooltipBy(e: Event, key: string) {
    const tooltip =
        this.shadowRoot?.getElementById(key + '-tooltip') as PaperDialogElement;
    if (tooltip != null && e.target != null) {
      tooltip.positionTarget = e.target as HTMLElement;
      tooltip.open();
    }
  }

  private getInputHeader(key: string, title: string, tooltip?: Tooltip) {
    const tooltipMarkup = tooltip == null ?
        nothing :
        html`<p
              id="${key}-info"
              class="info-icon"
              @click=${(e: Event) => this.openTooltipBy(e, key)}
            ></p>
            <paper-dialog
              id="${key}-tooltip"
              class="tooltip-dialog"
              no-overlap
              horizontal-align="center"
              vertical-align="bottom"
            >
              <p class="tooltip-text">
                ${tooltip.text ?? nothing}
              </p>
              <p class="tooltip-text">
                ${
            tooltip.url ? html`<a href="${tooltip.url}" target="_blank"
                      >${tooltip.url}</a
                    >` :
                          nothing}
              </p>
            </paper-dialog>`;

    return html`
      <div class="input-header">
        <p class="input-label">${title}</p>
        ${tooltipMarkup}
      </div>
    `;
  }

  private handleInputKeyup(
      e: Event, dispatcher: (value: string) => void,
      validator?: AttributeMetaData['key']['validator']) {
    const inputElement = e.target as HTMLInputElement;
    if (validator != null) {
      if (validator(inputElement.value)) {
        if (inputElement.value != '') {
          dispatcher(inputElement.value);
        }
        inputElement.style.border = 'var(--light-border)';
      } else {
        inputElement.style.borderColor = 'var(--validation-error-red-color)';
      }
    } else {
      dispatcher(inputElement.value);
    }
  }

  private getTextInput(
      key: string, title: string, value: string, id: string,
      attributeType: AttributeType, placeholder?: string, tooltip?: Tooltip,
      validator?: AttributeMetaData['key']['validator']): TemplateResult {
    return html`
      <div class="attribute-input-container">
      ${this.getInputHeader(key, title, tooltip)}
        <input
          class='attribute-input text-input'
          placeholder="${placeholder ?? ''}"
          @keyup=${(e: Event) => {
      this.handleInputKeyup(
          e,
          (value: string) => store.dispatch(
              updateWidgetMetaData(key, value, id, attributeType)),
          validator);
    }}
            value="${value}"
        ></input>
      </div>
    `;
  }

  private handleTextAreaKeyup(
      e: Event, dispatcher: (value: string) => void, validator?: Function) {
    const textareaInput = e.target as HTMLTextAreaElement;
    if (validator != null) {
      if (validator(textareaInput.value) || textareaInput.value === '') {
        dispatcher(textareaInput.value);
        textareaInput.style.border = 'var(--light-border)';
      } else {
        textareaInput.style.borderColor = 'var(--validation-error-red-color)';
      }
    } else {
      dispatcher(textareaInput.value);
    }
  }

  private getTextareaInput(
      key: string, title: string, value: string, id: string,
      attributeType: AttributeType, placeholder?: string, tooltip?: Tooltip,
      validator?: Function): TemplateResult {
    return html`
      <div class="attribute-input-container">
        ${this.getInputHeader(key, title, tooltip)}
        <textarea
          class="attribute-input text-input"
          placeholder="${placeholder ?? ''}"
          rows="4"
          @keyup=${(e: Event) => {
      this.handleTextAreaKeyup(
          e,
          (value: string) => store.dispatch(
              updateWidgetMetaData(key, value, id, attributeType)),
          validator);
    }}
        >
${value}</textarea
        >
      </div>
    `;
  }

  private getColorInput(
      key: string, title: string, value: string, id: string,
      attributeType: AttributeType, tooltip?: Tooltip): TemplateResult {
    // Since the color input does not read opacity values, we need to strip off,
    // the last two hex numbers that represent opacity.
    if (key === 'backgroundColor') {
      value = value.slice(0, 7);
    }

    return html`
      <div class='attribute-input-container'>
        ${this.getInputHeader(key, title, tooltip)}
        <input
          class='attribute-input color-input'
          type='color'
          @change=${
        (e: Event) => store.dispatch(updateWidgetMetaData(
            key, (e.target as HTMLInputElement).value, id, attributeType))}
          value='${value}'
        ></input
        >
      </div>
    `;
  }

  private getSelectInput(
      key: string, title: string, value: string, id: string,
      attributeType: AttributeType, tooltip?: Tooltip,
      items?: string[]|boolean[]): TemplateResult|{} {
    if (items == null) {
      return nothing;
    }
    const optionList = [];
    for (const item of items) {
      optionList.push(html`<option value="${item}" ?selected=${item === value}
        >${item}</option
      >`);
    }

    return html`
      <div class="attribute-input-container">
        ${this.getInputHeader(key, title, tooltip)}
        <select
          name="${title}"
          class="attribute-input"
          .value="${value}"
          @change=${
        (e: Event) => store.dispatch(updateWidgetMetaData(
            key, (e.target as HTMLInputElement).value, id, attributeType))}
        >
          ${optionList}
        </select>
      </div>
    `;
  }

  private getNumberInput(
      key: string, title: string, value: string, id: string,
      attributeType: AttributeType, placeholder?: string, tooltip?: Tooltip,
      validator?: AttributeMetaData['key']['validator'], unit?: string,
      step?: number, min?: number, max?: number): TemplateResult {
    let valueUnit = '';
    if (value.endsWith('px')) {
      valueUnit = 'px';
    } else if (value.endsWith('%')) {
      valueUnit = '%';
    }

    const unitMarkup = unit == null ?
        nothing :
        html`
            <select
              name="unit"
              class="unit-input"
              .value="${unit}"
              @change=${
            (e: Event) => store.dispatch(updateWidgetMetaData(
                key + '-unit', (e.target as HTMLInputElement).value, id,
                attributeType))}
            >
              <option value="px" ?selected=${valueUnit === 'px'}>px</option>
              <option value="%" ?selected=${valueUnit === '%'}>%</option>
            </select>
          `;

    return html`
      <div class='attribute-input-container'>
      ${this.getInputHeader(key, title, tooltip)}
        <div class='input-container'>
        <input
          class='attribute-input'
          type='${validator == null ? 'number' : 'tel'}'
          placeholder="${placeholder ?? ''}"
          min=${min ?? 0}
          max=${max ?? Number.MAX_VALUE}
          step="${step ?? 0.01}"
          oninput="${
        validator == null ? 'validity.valid || (value = \'\')' : ''}"
          value='${value.replace(valueUnit, '')}'
          @keyup=${(e: Event) => {
      this.handleInputKeyup(
          e,
          (value: string) => store.dispatch(
              updateWidgetMetaData(key, value, id, attributeType)),
          validator);
    }}
        ></input>
        ${unitMarkup}
        </div>
      </div>
    `;
  }

  private getUniqueAttributeMarkup(
      attributesArray: AttributeMetaData, uniqueAttributes: UniqueAttributes,
      id: string): Array<TemplateResult|{}> {
    return Object.keys(attributesArray).map((key) => {
      const value = uniqueAttributes[key];
      const placeholder = attributesArray[key].placeholder;
      const unit = attributesArray[key].unit;
      const step = attributesArray[key].step;
      const min = attributesArray[key].min;
      const max = attributesArray[key].max;
      const type = attributesArray[key].type;
      const items = attributesArray[key].items;
      const tooltip = attributesArray[key].tooltip;
      const validator = attributesArray[key].validator;

      const attributeTitle = camelCaseToTitleCase(key);

      switch (type) {
        case InputType.TEXT:
          return this.getTextInput(
              key, attributeTitle, value, id, AttributeType.UNIQUE, placeholder,
              tooltip, validator);
        case InputType.TEXTAREA:
          return this.getTextareaInput(
              key, attributeTitle, value, id, AttributeType.UNIQUE, placeholder,
              tooltip, validator);
        case InputType.COLOR:
          return this.getColorInput(
              key, attributeTitle, value, id, AttributeType.UNIQUE, tooltip);
        case InputType.SELECT:
          return this.getSelectInput(
              key, attributeTitle, value, id, AttributeType.UNIQUE, tooltip,
              items);
        case InputType.NUMBER:
          return this.getNumberInput(
              key, attributeTitle, value, id, AttributeType.UNIQUE, placeholder,
              tooltip, validator, unit, step, min, max);
        default:
          return nothing;
      }
    });
  }

  private getUniqueAttributes(): Array<TemplateResult|{}>|{} {
    const widget = this.editingWidget;
    if (widget == null) {
      return nothing;
    }

    const uniqueAttributes =
        store.getState().template.widgets[widget.id].uniqueAttributes;

    const widgetType = getWidgetType(widget.id);

    switch (widgetType) {
      case WidgetType.LABEL:
        return this.getUniqueAttributeMarkup(
            Label.attributes, uniqueAttributes, widget.id);
      case WidgetType.BUTTON:
        return this.getUniqueAttributeMarkup(
            Button.attributes, uniqueAttributes, widget.id);
      case WidgetType.CHECKBOX:
        return this.getUniqueAttributeMarkup(
            Checkbox.attributes, uniqueAttributes, widget.id);
      case WidgetType.SELECT:
        return this.getUniqueAttributeMarkup(
            Select.attributes, uniqueAttributes, widget.id);
      case WidgetType.SLIDER:
        return this.getUniqueAttributeMarkup(
            Slider.attributes, uniqueAttributes, widget.id);
      case WidgetType.TEXTBOX:
        return this.getUniqueAttributeMarkup(
            Textbox.attributes, uniqueAttributes, widget.id);
      case WidgetType.CHART:
        return this.getUniqueAttributeMarkup(
            Chart.attributes, uniqueAttributes, widget.id);
      case WidgetType.MAP:
        return this.getUniqueAttributeMarkup(
            Map.attributes, uniqueAttributes, widget.id);
      default:
        return nothing;
    }
  }

  private getStyleAttributes(): Array<TemplateResult|{}>|{} {
    const widget = this.editingWidget;
    if (widget == null) {
      return nothing;
    }

    const styleAttributes = store.getState().template.widgets[widget.id].style;
    return Object.keys(sharedAttributes).map((key) => {
      const value = styleAttributes[key];
      const placeholder = sharedAttributes[key].placeholder;
      const unit = sharedAttributes[key].unit;
      const step = sharedAttributes[key].step;
      const min = sharedAttributes[key].min;
      const max = sharedAttributes[key].max;
      const type = sharedAttributes[key].type;
      const items = sharedAttributes[key].items;
      const tooltip = sharedAttributes[key].tooltip;
      const validator = sharedAttributes[key].validator;

      const attributeTitle = camelCaseToTitleCase(key);

      switch (type) {
        case InputType.TEXT:
          return this.getTextInput(
              key, attributeTitle, value, widget.id, AttributeType.STYLE,
              placeholder, tooltip, validator);
        case InputType.TEXTAREA:
          return this.getTextareaInput(
              key, attributeTitle, value, widget.id, AttributeType.STYLE,
              placeholder, tooltip, validator);
        case InputType.COLOR:
          return this.getColorInput(
              key, attributeTitle, value, widget.id, AttributeType.STYLE,
              tooltip);
        case InputType.SELECT:
          return this.getSelectInput(
              key, attributeTitle, value, widget.id, AttributeType.STYLE,
              tooltip, items);
        case InputType.NUMBER:
          return this.getNumberInput(
              key, attributeTitle, value, widget.id, AttributeType.STYLE,
              placeholder, tooltip, validator, unit, step, min, max);
        default:
          return nothing;
      }
    });
  }

  static emptyNotice = html`
    <empty-notice
      icon="create"
      message="No widget selected. Click on a widget to select it."
      size="large"
      bold
    ></empty-notice>
  `;

  render() {
    const uniqueAttributesMarkup = this.getUniqueAttributes();
    const styleAttributesMarkup = this.getStyleAttributes();

    return html`
      <tab-container title="Attributes">
        <slot>
          ${uniqueAttributesMarkup} ${styleAttributesMarkup}
          ${this.editingWidget ? nothing : AttributesTab.emptyNotice}
        </slot>
      </tab-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'attributes-tab': AttributesTab;
  }
}
