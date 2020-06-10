/**
 *  @fileoverview The attributes-tab widget contains the different
 *  attributes that a user can edit for a particular element.
 */
import { html, customElement, css, property, LitElement } from 'lit-element';
import { nothing, render } from 'lit-html';
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store.js';
import { AppCreatorStore } from '../../redux/reducer';
import '../tab-container/tab-container';
import {
  sharedAttributes,
  AttributeMetaData,
  UniqueAttributes,
} from '../../redux/types/attributes.js';
import './../empty-notice/empty-notice';
import { camelCaseToTitleCase, getIdPrefix } from '../../utils/helpers.js';
import { updateWidgetMetaData } from '../../redux/actions.js';
import {
  EventType,
  AttributeType,
  InputType,
  WidgetType,
} from '../../redux/types/enums.js';
import { Label } from '../ui-label/ui-label.js';
import { Button } from '../ui-button/ui-button.js';
import { Checkbox } from '../ui-checkbox/ui-checkbox.js';
import { Select } from '../ui-select/ui-select.js';
import { Slider } from '../ui-slider/ui-slider.js';
import { Textbox } from '../ui-textbox/ui-textbox.js';

@customElement('attributes-tab')
export class AttributesTab extends connect(store)(LitElement) {
  static styles = css`
    input {
      margin: var(--tight) 0px;
    }

    .input-label {
      margin: 0px 0px;
      font-size: 0.7rem;
      font-weight: 600;
    }

    .attribute-input-container {
      width: 95%;
      margin: var(--extra-tight) 0px;
      margin-right: 0px;
    }

    .attribute-input {
      border: var(--light-border);
      padding: var(--extra-tight);
      -webkit-border-radius: var(--extra-tight);
      border-radius: var(--extra-tight);
      width: 100% !important;
      resize: none;
      font-family: inherit;
      background-color: var(--primary-color);
      margin: var(--tight) 0px;
    }

    .attribute-input:focus {
      border-color: var(--accent-color);
      outline: none;
    }

    .attribute-input-container {
      margin: var(--tight) 0px;
      width: calc(100% - var(--regular));
    }

    .select-input {
      width: 97.5%;
    }
  `;

  stateChanged(state: AppCreatorStore) {
    if (state.element !== this.editingWidget) {
      this.editingWidget = state.element;

      const slot = this.shadowRoot
        ?.querySelector('tab-container')
        ?.querySelector('slot')!;

      if (slot == null) {
        return;
      }

      const uniqueAttributesMarkup = this.getUniqueAttributes();
      const styleAttributesMarkup = this.getStyleAttributes();

      render(
        html``,
        this.shadowRoot?.querySelector('tab-container')?.querySelector('slot')!
      );

      render(
        html`${uniqueAttributesMarkup} ${styleAttributesMarkup}
        ${this.editingWidget ? nothing : AttributesTab.emptyNotice}`,
        this.shadowRoot?.querySelector('tab-container')?.querySelector('slot')!
      );
    }
  }

  /**
   * Sets the search query.
   */
  @property({ type: String }) query = '';

  /**
   * Widget currently being edited.
   */
  editingWidget: Element | null =
    store.getState().eventType === EventType.editing
      ? store.getState().element
      : null;

  getTextInput(
    key: string,
    title: string,
    value: string,
    id: string,
    attributeType: AttributeType
  ) {
    return html`
      <div class="attribute-input-container">
        <p class="input-label">${title}</p>
        <input
          class='attribute-input'
          @keyup=${(e: Event) =>
            store.dispatch(
              updateWidgetMetaData(
                key,
                (e.target as HTMLInputElement).value,
                id,
                attributeType
              )
            )}
            value="${value}"
        ></input>
      </div>
    `;
  }

  getTextareaInput(
    key: string,
    title: string,
    value: string,
    id: string,
    attributeType: AttributeType
  ) {
    return html`
      <div class="attribute-input-container">
        <p class="input-label">${title}</p>
        <textarea
          class="attribute-input"
          rows="4"
          @keyup=${(e: Event) =>
            store.dispatch(
              updateWidgetMetaData(
                key,
                (e.target as HTMLTextAreaElement).value,
                id,
                attributeType
              )
            )}
        >
${value}</textarea
        >
      </div>
    `;
  }

  getColorInput(
    key: string,
    title: string,
    value: string,
    id: string,
    attributeType: AttributeType
  ) {
    return html`
      <div class='attribute-input-container'>
        <p class='input-label'>${title}</p>
        <input
          class='attribute-input'
          type='color'
          @change=${(e: Event) =>
            store.dispatch(
              updateWidgetMetaData(
                key,
                (e.target as HTMLInputElement).value,
                id,
                attributeType
              )
            )}
          value='${value}'
        ></input
        >
      </div>
    `;
  }

  getSelectInput(
    key: string,
    title: string,
    value: string,
    items: string[] | boolean[] | undefined,
    id: string,
    attributeType: AttributeType
  ) {
    if (items == null) {
      return;
    }
    const optionList = [];
    for (const item of items) {
      optionList.push(html`<option value="${item}" ?selected=${item === value}
        >${item}</option
      >`);
    }
    return html`
      <div class="attribute-input-container select-input">
        <p class="input-label">${title}</p>
        <select
          name="${title}"
          class="attribute-input"
          .value="${value}"
          @change=${(e: Event) =>
            store.dispatch(
              updateWidgetMetaData(
                key,
                (e.target as HTMLInputElement).value,
                id,
                attributeType
              )
            )}
        >
          ${optionList}
        </select>
      </div>
    `;
  }

  getNumberInput(
    key: string,
    title: string,
    value: string,
    id: string,
    attributeType: AttributeType
  ) {
    return html`
      <div class='attribute-input-container'>
        <p class='input-label'>${title}</p>
        <input
          class='attribute-input'
          type='number'
          min="0"
          oninput="validity.valid||(value='');"
          value='${value.replace('px', '')}'
          @change=${(e: Event) =>
            store.dispatch(
              updateWidgetMetaData(
                key,
                (e.target as HTMLInputElement).value + 'px',
                id,
                attributeType
              )
            )}
        ></input>
      </div>
    `;
  }

  getUniqueAttributeMarkup(
    attributesArray: AttributeMetaData,
    uniqueAttributes: UniqueAttributes,
    id: string
  ) {
    return Object.keys(attributesArray).map((key) => {
      const value = uniqueAttributes[key];
      const type = attributesArray[key].type;
      const items = attributesArray[key].items;

      const attributeTitle = camelCaseToTitleCase(key);

      switch (type) {
        case InputType.text:
          return this.getTextInput(
            key,
            attributeTitle,
            value,
            id,
            AttributeType.unique
          );
        case InputType.textarea:
          return this.getTextareaInput(
            key,
            attributeTitle,
            value,
            id,
            AttributeType.unique
          );
        case InputType.color:
          return this.getColorInput(
            key,
            attributeTitle,
            value,
            id,
            AttributeType.unique
          );
        case InputType.select:
          return this.getSelectInput(
            key,
            attributeTitle,
            value,
            items,
            id,
            AttributeType.unique
          );
        case InputType.number:
          return this.getNumberInput(
            key,
            attributeTitle,
            value,
            id,
            AttributeType.unique
          );
        default:
          return nothing;
      }
    });
  }

  getUniqueAttributes() {
    const widget = this.editingWidget;
    if (widget == null) {
      return;
    }

    const uniqueAttributes = store.getState().template[widget.id]
      .uniqueAttributes;

    const widgetType = getIdPrefix(widget.id);

    switch (widgetType) {
      case WidgetType.label:
        return this.getUniqueAttributeMarkup(
          Label.attributes,
          uniqueAttributes,
          widget.id
        );
      case WidgetType.button:
        return this.getUniqueAttributeMarkup(
          Button.attributes,
          uniqueAttributes,
          widget.id
        );
      case WidgetType.checkbox:
        return this.getUniqueAttributeMarkup(
          Checkbox.attributes,
          uniqueAttributes,
          widget.id
        );
      case WidgetType.select:
        return this.getUniqueAttributeMarkup(
          Select.attributes,
          uniqueAttributes,
          widget.id
        );
      case WidgetType.slider:
        return this.getUniqueAttributeMarkup(
          Slider.attributes,
          uniqueAttributes,
          widget.id
        );
      case WidgetType.textbox:
        return this.getUniqueAttributeMarkup(
          Textbox.attributes,
          uniqueAttributes,
          widget.id
        );
      default:
        return nothing;
    }
  }

  getStyleAttributes() {
    const widget = this.editingWidget;
    if (widget == null) {
      return;
    }

    const styleAttributes = store.getState().template[widget.id].style;

    return Object.keys(sharedAttributes).map((key) => {
      const value = styleAttributes[key];
      const type = sharedAttributes[key].type;
      const items = sharedAttributes[key].items;

      const attributeTitle = camelCaseToTitleCase(key);

      switch (type) {
        case InputType.text:
          return this.getTextInput(
            key,
            attributeTitle,
            value,
            widget.id,
            AttributeType.style
          );
        case InputType.textarea:
          return this.getTextareaInput(
            key,
            attributeTitle,
            value,
            widget.id,
            AttributeType.style
          );
        case InputType.color:
          return this.getColorInput(
            key,
            attributeTitle,
            value,
            widget.id,
            AttributeType.style
          );
        case InputType.select:
          return this.getSelectInput(
            key,
            attributeTitle,
            value,
            items,
            widget.id,
            AttributeType.style
          );
        case InputType.number:
          return this.getNumberInput(
            key,
            attributeTitle,
            value,
            widget.id,
            AttributeType.style
          );
        default:
          return nothing;
      }
    });
  }

  static emptyNotice = html`
    <empty-notice
      icon="create"
      message="No widget selected. Click on a widget's edit icon to select it."
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