/**
 *  @fileoverview The tab-container is used as a wrapper for the different tabs
 *  in the actions-panel.
 */
import { LitElement, html, customElement, css, property } from 'lit-element';

@customElement('tab-container')
export class TabContainer extends LitElement {
  /**
   * Additional custom styles.
   */
  static styles = css`
    #container {
      height: calc(100vh - 67.57px - 80px);
      width: calc(var(--actions-panel-width) - 2 * var(--regular));
      overflow-y: scroll;
      padding: var(--regular);
    }

    h4 {
      margin-top: var(--extra-tight);
      margin-bottom: var(--regular);
    }
  `;

  /**
   * The title of the tab container.
   */
  @property({ type: String })
  title = '';

  render() {
    const { title } = this;
    return html`
      <div id="container">
        <h4>${title}</h4>
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