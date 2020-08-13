/**
 *  @fileoverview The app-root widget is the starting point of our application
 *  in which all other widgets are rendered.
 */
import { LitElement, html, customElement, css } from 'lit-element';
import './tool-bar/tool-bar';
import './actions-panel/actions-panel';
import './tab-container/tab-container';
import './story-board/story-board';
import './search-bar/search-bar';
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-toast/paper-toast.js';
import '@cwmr/paper-chip/paper-chip.js';
import './template-wizard/template-wizard';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    #app {
      height: 100%;
      width: 100%;
    }

    #container {
      display: flex;
      width: 100%;
      height: calc(100vh - 47px);
    }

    #storyboard {
      height: 90%;
      width: 90%;
      display: flex;
      align-items: center;
    }

    #storyboard-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
  `;

  render() {
    return html`
      <div id="app">
        <tool-bar></tool-bar>
        <div id="container">
          <actions-panel></actions-panel>
          <div id="storyboard-container">
            <story-board id="storyboard"></story-board>
          </div>
          <template-wizard></template-wizard>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
