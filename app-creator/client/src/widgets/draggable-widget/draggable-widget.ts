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
 * @fileoverview The draggable-widget wraps other widgets to make them
 * draggable.
 */

import '../tab-container/tab-container';

import {css, customElement, html, LitElement, property} from 'lit-element';
import {nothing} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map';

import {incrementWidgetID, removeWidgetMetaData, resetDraggingValues, setDraggingWidget, setEditingWidget,} from '../../redux/actions';
import {store} from '../../redux/store';
import {EventType, WidgetType} from '../../redux/types/enums';
import {getWidgetType} from '../../utils/helpers';
import {CONTAINER_ID, Dropzone} from '../dropzone-widget/dropzone-widget';

@customElement('draggable-widget')
export class DraggableWidget extends LitElement {
  static styles = css`
    #container {
      border: var(--light-dashed-border);
      border-radius: var(--tight);
      width: 100%;
      min-height: 30px;
      margin: var(--extra-tight) 0px;
      position: relative;
      cursor: move;
      overflow: hiden;
    }

    .overlay {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    #editable-view {
      position: absolute;
      top: var(--extra-tight);
      right: var(--extra-tight);
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    .edit-buttons {
      background-color: white;
      color: black;
      border: var(--light-border);
      border-radius: var(--extra-tight);
      margin-left: var(--extra-tight);
      cursor: pointer;
    }

    .edit-buttons:hover {
      background-color: lightgray;
    }
  `;

  /**
   * Additional custom styles.
   */
  @property({type: Object}) styles = {};

  /**
   * Determines if widget should have a draggable overlay.
   */
  @property({type: Boolean}) hasOverlay = true;

  /**
   * Adds edit and trash actions to the draggable widget.
   */
  @property({type: Boolean}) editable = false;

  /**
   * Sets the editing widget's parent container border color to the default gray
   * color.
   */
  static removeEditingWidgetHighlight() {
    const editingWidget = store.getState().editingElement;

    if (editingWidget == null) {
      return;
    }

    const type = getWidgetType(editingWidget.id) as WidgetType;

    if (type === WidgetType.PANEL || type === WidgetType.SIDEMENU) {
      let dropzone = editingWidget.querySelector('dropzone-widget');

      if (dropzone == null) {
        dropzone =
            editingWidget.querySelector('slot')?.assignedNodes().find(
                (node) => node.nodeName === 'DROPZONE-WIDGET') as Dropzone;
      }

      if (dropzone != null) {
        (dropzone as Dropzone)
            .setStyleProperty('borderColor', 'var(--border-gray)');
      }
    } else {
      const editingWidgetParent = editingWidget?.parentElement;
      const editingWidgetParentContainer =
          editingWidgetParent?.shadowRoot?.getElementById(CONTAINER_ID);
      if (editingWidgetParentContainer != null) {
        editingWidgetParentContainer.style.borderColor = 'var(--border-gray)';
      }
    }
  }

  render() {
    const {
      editable,
      hasOverlay,
      styles,
      handleDragstart,
      handleDragend,
      handleRemoveWidget,
      handleEditWidget,
    } = this;

    const overlay = hasOverlay ? html`<div class="overlay"></div>` : nothing;

    const editableMarkup = editable ? html`
          <div id="editable-view">
            <iron-icon
              class="edit-buttons"
              icon="icons:delete"
              @click=${handleRemoveWidget}
            ></iron-icon>
          </div>
        ` :
                                      nothing;

    return html`
      <div
        id="container"
        draggable="true"
        style=${styleMap(styles)}
        @click=${handleEditWidget}
        @dragstart=${handleDragstart}
        @dragend=${handleDragend}
      >
        <slot></slot>
        ${overlay} ${editableMarkup}
      </div>
    `;
  }

  /**
   * Triggered when the edit icon is clicked. Stores a reference of the selected
   * element in the store and displays a set of inputs for editing its
   * attributes.
   */
  private handleEditWidget(e: Event) {
    e.stopPropagation();
    if (!this.editable) {
      /**
       * Draggable widgets on the left side panel are not editable
       * and thus we need to return early.
       */
      return;
    }

    const container =
        this.shadowRoot?.getElementById(CONTAINER_ID) as HTMLElement;

    const widget = this.extractChildWidget(container);
    if (widget == null) {
      return;
    }

    DraggableWidget.removeEditingWidgetHighlight();

    store.dispatch(setEditingWidget(widget));

    container.style.borderColor = store.getState().selectedPalette.color;
  }

  /**
   * Returns the widget inside the draggable wrapper.
   * @param target draggable wrapper element.
   */
  private extractChildWidget(target: HTMLElement): Element|undefined {
    // We want to unwrap the draggable wrapper and only reference the the inner
    // element.
    return target.querySelector('slot')?.assignedElements()[0];
  }

  /**
   * Triggered when the trash icon is clicked.
   */
  private handleRemoveWidget(e: Event) {
    e.stopPropagation();
    const container =
        this.shadowRoot?.getElementById(CONTAINER_ID) as HTMLElement;

    const widget = this.extractChildWidget(container);
    if (widget == null) {
      return;
    }

    if (widget === store.getState().editingElement) {
      // clearing editing widget state
      store.dispatch(setEditingWidget(null));
    }

    const parent = this.parentElement;
    if (parent == null) {
      return;
    }

    parent.removeChild(this);
    store.dispatch(removeWidgetMetaData(widget.id));
  }

  /**
   * Callback triggered on the beginning of a drag action. We use it to
   * reference the currently dragged element in a global state.
   * @param e dragstart event
   */
  private handleDragstart(e: Event) {
    const target = e.target as DraggableWidget;
    if (target == null) {
      return;
    }

    // We want to unwrap the draggable wrapper and only reference the the inner
    // element.
    const widget = this.extractChildWidget(target);
    if (widget == null) {
      return;
    }

    // Referencing the currently dragged element in global state.
    store.dispatch(setDraggingWidget(widget));
  }

  /**
   * Callback triggered on the end of a drag action. We use it to clear the
   * reference of a currently dragged element and increment a widget id if
   * necessary. This is called when adding a new widget from the side panel and
   * when reordering widgets in a dropzone.
   * @param e dragend event
   */
  private handleDragend() {
    const addedElement = store.getState().eventType === EventType.ADDING ?
        store.getState().draggingElement :
        null;

    // We only need to increment the widget id when adding a new widget.
    if (store.getState().eventType === EventType.ADDING &&
        addedElement != null) {
      store.dispatch(incrementWidgetID(addedElement.id));
    }

    store.dispatch(resetDraggingValues());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'draggable-widget': DraggableWidget;
  }
}
