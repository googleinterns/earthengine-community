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
 * @fileoverview The app-root widget is the starting point of our application
 *  in which all other widgets are rendered.
 */

import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-toast/paper-toast.js';
import '@cwmr/paper-chip/paper-chip.js';
import './tool-bar/tool-bar';
import './actions-panel/actions-panel';
import './tab-container/tab-container';
import './story-board/story-board';
import './search-bar/search-bar';
import './template-wizard/template-wizard';
import './scratch-panel/scratch-panel';

import {css, customElement, html, LitElement} from 'lit-element';

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

          <scratch-panel></scratch-panel>
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
