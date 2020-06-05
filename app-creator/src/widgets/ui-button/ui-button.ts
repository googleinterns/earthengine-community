import '@polymer/paper-button';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { DEFAULT_SHARED_ATTRIBUTES } from '../../redux/types/attributes';

@customElement('ui-button')
export class Button extends LitElement {
  static styles = css`
    paper-button {
      margin: var(--tight);
      background-color: var(--primary-color);
      color: var(--primary-color);
      height: 30px;
      font-size: 0.8rem;
    }
  `;

  /**
   * Additional custom styles for the button.
   */
  @property({ type: Object }) styles = DEFAULT_SHARED_ATTRIBUTES;

  /**
   * If true, the user cannot interact with this element.
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * Adds a button border and shadow when true.
   */
  @property({ type: Boolean }) raised = true;

  /**
   * Sets the button label.
   */
  @property({ type: String }) label = '';

  /**
   * Callback triggered on button click.
   */
  @property({ type: Object }) onClickHandler: () => void = () => {};

  render() {
    return html`
      <paper-button
        style=${styleMap(this.styles)}
        draggable="true"
        @click=${this.onClickHandler}
        ?disabled=${this.disabled}
        ?raised=${this.raised}
      >
        ${this.label}
      </paper-button>
    `;
  }

  setAttribute(key: string, value: string) {
    switch (key) {
      case 'label':
        this.label = value;
        break;
      case 'raised':
        this.raised = value === 'true';
        break;
      case 'disabled':
        this.disabled = value === 'true';
        break;
    }

    this.requestUpdate();
  }

  getDisabled(): boolean {
    return this.disabled;
  }

  getLabel(): string {
    return this.label;
  }

  onClick(callback: () => void): void {
    this.onClickHandler = callback;
  }

  setLabel(label: string): Button {
    this.label = label;
    return this;
  }

  getStyle(): object {
    return this.styles;
  }

  setStyle(style: { [key: string]: string }) {
    this.styles = style;
    this.requestUpdate();
  }
}
