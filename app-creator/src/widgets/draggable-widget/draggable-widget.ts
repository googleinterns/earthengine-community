/**
 *  @fileoverview The draggable-widget wraps other widgets to make them draggable.
 */
import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';
import '../tab-container/tab-container';
import '@polymer/iron-icons/editor-icons.js';
import { EMPTY_NOTICE_ID } from '../empty-notice/empty-notice';
import { CONTAINER_ID } from '../dropzone-widget/dropzone-widget';
import { store } from '../../redux/store';
import {
  setEditingWidget,
  setDraggingWidget,
  resetDraggingValues,
  incrementWidgetID,
} from '../../redux/actions';

@customElement('draggable-widget')
export class DraggableWidget extends LitElement {
  /**
   * Additional custom styles.
   */
  static styles = css`
    #container {
      border: var(--light-dashed-border);
      border-radius: var(--tight);
      width: 100%;
      margin: var(--extra-tight) 0px;
      position: relative;
      cursor: move;
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
   * Determines if widget should have a draggable overlay.
   */
  @property({ type: Boolean })
  hasOverlay = true;

  /**
   * Adds edit and trash actions to the draggable widget.
   */
  @property({ type: Boolean })
  editable = false;

  render() {
    const {
      editable,
      hasOverlay,
      handleDragstart,
      handleDragend,
      handleRemoveWidget,
      handleEditWidget,
    } = this;

    const overlay = hasOverlay ? html`<div class="overlay"></div>` : nothing;

    const editableMarkup = editable
      ? html`
          <div id="editable-view">
            <iron-icon
              class="edit-buttons"
              icon="create"
              @click=${handleEditWidget}
            ></iron-icon>
            <iron-icon
              class="edit-buttons"
              icon="icons:delete"
              @click=${handleRemoveWidget}
            ></iron-icon>
          </div>
        `
      : nothing;

    return html`
      <div
        id="container"
        draggable="true"
        @dragstart=${handleDragstart}
        @dragend=${handleDragend}
      >
        <slot></slot>
        ${overlay} ${editableMarkup}
      </div>
    `;
  }

  /**
   * Triggered when the edit icon is clicked. Stores a reference of the selected element in the store and
   * displays a set of inputs for editing its attributes.
   */
  handleEditWidget() {
    const container = this.shadowRoot?.getElementById(
      CONTAINER_ID
    ) as HTMLElement;

    const widget = this.extractChildWidget(container);
    if (widget == null) {
      return;
    }

    store.dispatch(setEditingWidget(widget));
  }

  /**
   * Returns the widget inside the draggable wrapper.
   * @param target draggable wrapper element.
   */
  extractChildWidget(target: HTMLElement) {
    // We want to unwrap the draggable wrapper and only reference the the inner element.
    return target.querySelector('slot')?.assignedElements()[0];
  }

  /**
   * Triggered when the trash icon is clicked. If the widget is the last in the dropzone,
   * we display the empty empty notice and center the container's flex alignments.
   */
  handleRemoveWidget() {
    const container = this.shadowRoot?.getElementById(
      CONTAINER_ID
    ) as HTMLElement;

    const widget = this.extractChildWidget(container);
    if (widget == null) {
      return;
    }

    if (widget === store.getState().editingWidget) {
      // clearing editing widget state
      store.dispatch(setEditingWidget(null));
    }

    const parent = this.parentElement;
    if (parent == null) {
      return;
    }

    parent.removeChild(this);

    const childrenCount = parent.childElementCount;

    // We never really remove the empty notice div (we just hide it with display='none').
    // When the children count is 1 after removing a widget, we want to unhide the empty notice.
    if (childrenCount === 1) {
      this.showEmptyNotice(parent);
    }
  }

  /**
   * Callback triggered on the beginning of a drag action. We use it to reference the currently
   * dragged element in a global state.
   * @param e dragstart event
   */
  handleDragstart(e: Event) {
    const target = e.target as DraggableWidget;
    if (target == null) {
      return;
    }

    // We want to unwrap the draggable wrapper and only reference the the inner element.
    const widget = this.extractChildWidget(target);
    if (widget == null) {
      return;
    }

    // Referencing the currently dragged element in global state.
    store.dispatch(setDraggingWidget(widget));
  }

  /**
   * Callback triggered on the end of a drag action. We use it to clear the reference
   * of a currently dragged element and increment a widget id if necessary.
   * @param e dragend event
   */
  handleDragend() {
    const draggingWidget = store.getState().draggingWidget;
    if (
      draggingWidget &&
      store.getState().elementAdded &&
      !store.getState().reordering
    ) {
      store.dispatch(incrementWidgetID(draggingWidget.id));
    }
    store.dispatch(resetDraggingValues());
  }

  /**
   * Displays empty notice by changing display property from 'none' to 'flex'.
   * @param parent: element containing empty notice content
   */
  showEmptyNotice(parent: HTMLElement) {
    const emptyNotice = parent.querySelector(
      `#${EMPTY_NOTICE_ID}`
    ) as HTMLElement;
    if (emptyNotice == null) {
      return;
    }
    emptyNotice.style.display = 'flex';
    parent.style.alignItems = 'center';
    parent.style.justifyContent = 'center';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'draggable-widget': DraggableWidget;
  }
}
