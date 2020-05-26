/**
 *  @fileoverview The story-board widget lets users preview and edit their templates.
 */
import { css, customElement, html, LitElement, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import '@polymer/paper-card/paper-card.js';
import '../dropzone-widget/dropzone-widget';

@customElement('story-board')
export class Storyboard extends LitElement {
  static styles = css`
    #container {
      height: 100%;
      width: 100%;
      background-color: var(--primary-color);
      padding: var(--tight);
    }
  `;

  /**
   * Additional custom styles for the button.
   */
  @property({ type: Object }) styles = {};

  render() {
    const { styles } = this;

    return html`
      <paper-card id="container" style=${styleMap(styles)}>
        <dropzone-widget></dropzone-widget>
      </paper-card>
    `;
  }

  getStyle(): object {
    return this.styles;
  }
}