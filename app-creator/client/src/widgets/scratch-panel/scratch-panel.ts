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
 * @fileoverview The scratch-panel widget is the right side panel that stores
 * intermediary widgets.
 */

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '../tab-container/tab-container';
import '../dropzone-widget/dropzone-widget';

import {IronIconElement} from '@polymer/iron-icon';
import {css, customElement, html, LitElement, query} from 'lit-element';
import {connect} from 'pwa-helpers';

import {setEventType} from '../../redux/actions';
import {AppCreatorStore, WidgetMetaData} from '../../redux/reducer';
import {store} from '../../redux/store';
import {EventType} from '../../redux/types/enums';
import {addBackgroundColorToSharedWidget} from '../../utils/helpers';
import {DraggableWidget} from '../draggable-widget/draggable-widget';
import {Dropzone} from '../dropzone-widget/dropzone-widget';

@customElement('scratch-panel') export class ScratchPanel extends connect
(store)(LitElement) {
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

    #scratch-panel {
      height: 95%;
    }

    paper-tabs {
      border-bottom: var(--light-border);
      height: 40px;
      --iron-icon-height: 18px;
      --iron-icon-width: 18px;
    }
  `;

  /**
   * Reference to the scratch panel's dropzone.
   */
  @query('dropzone-widget') dropzone!: Dropzone;

  stateChanged(state: AppCreatorStore) {
    if (state.eventType === EventType.SHAREDWIDGETS) {
      const {
        template: {widgets},
      } = state;
      this.populateDropzone(widgets);
      store.dispatch(setEventType(EventType.NONE));
    }
  }

  /**
   * Populates dropzone with shared widgets from the store.
   */
  private populateDropzone(widgets: {[key: string]: WidgetMetaData}) {
    /*
     * We need to clear the dropzone because we lose widget references
     * when we serialize and deserialize the template. As a result, we
     * create new DOM elements and append them to the dropzone.
     */
    this.dropzone.innerHTML = '';
    for (const id in widgets) {
      const widget = widgets[id];
      if (widget.shared) {
        const element = widget.widgetRef;
        if (element) {
          const draggableWrapper = new DraggableWidget();
          draggableWrapper.editable = true;
          draggableWrapper.appendChild(element);

          addBackgroundColorToSharedWidget(element);

          if (this.dropzone) {
            this.dropzone.appendChild(draggableWrapper);
          }
        }
      }
    }
  }

  /**
   * Collapses/Expands the actions panel.
   */
  private togglePanel({target}: {target: EventTarget}) {
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
          <paper-tabs disabled noink>
            <paper-tab disabled>
              <iron-icon icon="icons:select-all"></iron-icon>
            </paper-tab>
          </paper-tabs>
          <iron-icon
            @click=${this.togglePanel}
            id="toggle-side-panel"
            icon="icons:chevron-right"
          ></iron-icon>
          <tab-container title="Shared Widgets">
            <div id="scratch-panel">
              <dropzone-widget id="shared-dropzone"></dropzone-widget>
            </div>
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
