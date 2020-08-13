/**
 *  @fileoverview The ui-checkbox widget lets users add a checkbox component to their templates.
 */
import '@polymer/paper-checkbox/paper-checkbox.js';
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import {
  DEFAULT_SHARED_ATTRIBUTES,
  AttributeMetaData,
  DefaultAttributesType,
  getDefaultAttributes,
} from '../../redux/types/attributes';
import { InputType } from '../../redux/types/enums';
import { PaperCheckboxElement } from '@polymer/paper-checkbox/paper-checkbox.js';
import { store } from '../../redux/store';

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

  static disabledStyles: Set<string> = new Set([
    'textAlign',
    'whiteSpace',
    'shown',
  ]);

  static DEFAULT_CHECKBOX_ATTRIBUTES: DefaultAttributesType = getDefaultAttributes(
    Checkbox.attributes
  );

  /**
   * Additional custom styles.
   */
  @property({ type: Object }) styles = DEFAULT_SHARED_ATTRIBUTES;

  /**
   * Sets checkbox label.
   */
  @property({ type: String }) label = '';

  /**
   * If true, the user cannot interact with this element.
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * If true, checkbox displays a checkmark.
   */
  @property({ type: Boolean })
  checked = false;

  @query('paper-checkbox') checkbox!: PaperCheckboxElement;

  render() {
    const { label, styles, checked, disabled } = this;

    return html`
      <paper-checkbox
        style=${styleMap({
          ...styles,
          '--paper-checkbox-label-color': styles.color,
          '--paper-checkbox-unchecked-color': styles.color,
          '--paper-checkbox-checked-color': styles.color,
          '--paper-checkbox-checkmark-color': store.getState().selectedPalette
            .backgroundColor,
        })}
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

  setStyle(style: { [key: string]: string }) {
    this.styles = style;
    this.requestUpdate();
  }
}
