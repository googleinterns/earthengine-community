/**
 *  @fileoverview The scratch-panel widget is the right side panel in that stores intermediary
 */
import { LitElement, html, customElement, css } from 'lit-element';
import { IronIconElement } from '@polymer/iron-icon';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '../tab-container/tab-container';
import '../dropzone-widget/dropzone-widget';

@customElement('scratch-panel')
export class ScratchPanel extends LitElement {
  static styles = css`
    #container {
      width: var(--actions-panel-width);
      height: 100%;
      border-left: var(--light-border);
      display: flex;
      position: relative;
      background-color: var(--primary-color);
    }

    #toggle-side-panel {
      position: absolute;
      cursor: pointer;
      top: 16px;
      left: -20px;
      background-color: white;
      border: var(--light-border);
      border-right: none;
      z-index: 10;
      --iron-icon-height: 18px;
      --iron-icon-width: 18px;
    }

    #panel {
      width: 100%;
      overflow-x: hidden;
    }

    paper-tabs {
      border-bottom: var(--light-border);
      --iron-icon-height: 18px;
      --iron-icon-width: 18px;
      height: 40px;
    }
  `;

  /**
   * Collapses/Expands the actions panel.
   */
  togglePanel({ target }: { target: EventTarget }) {
    const panel = this.shadowRoot?.getElementById('container');

    if (panel == null) {
      return;
    }

    if (panel.style.width === '0px') {
      panel.style.width = 'var(--actions-panel-width)';
      (target as IronIconElement).icon = 'icons:chevron-right';
    } else {
      panel.style.width = '0px';
      (target as IronIconElement).icon = 'icons:chevron-left';
    }
  }

  render() {
    return html`
      <div id="container">
        <div id="panel">
          <paper-tabs noink>
            <paper-tab>
              <iron-icon icon="icons:select-all"></iron-icon>
            </paper-tab>
          </paper-tabs>
          <iron-icon
            @click=${this.togglePanel}
            id="toggle-side-panel"
            icon="icons:chevron-right"
          ></iron-icon>

          <tab-container title="Shared Widgets">
            <dropzone-widget></dropzone-widget>
          </tab-container>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scratch-panel': ScratchPanel;
  }
}
