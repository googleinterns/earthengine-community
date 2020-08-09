/**
 *  @fileoverview The story-board widget lets users preview and edit their templates.
 */
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';
import { connect } from 'pwa-helpers';
import { DeviceType, EventType, PaletteNames } from '../../redux/types/enums';
import { store } from '../../redux/store';
import { AppCreatorStore } from '../../redux/reducer';
import { PaperCardElement } from '@polymer/paper-card/paper-card.js';
import {
  generateUI,
  incrementWidgetIDs,
} from '../../utils/template-generation';
import {
  setSelectedTemplateID,
  setEventType,
  setPalette,
} from '../../redux/actions';
import { PaperDialogElement } from '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '../dropzone-widget/dropzone-widget';
import '../ui-map/ui-map';
import '../ui-panel/ui-panel';
import '@polymer/paper-dialog/paper-dialog';
import { createToastMessage } from '../../utils/helpers';
import { PaperToastElement } from '@polymer/paper-toast';

const STORYBOARD_ID = 'storyboard';

/**
 * The story-board widget renders the currently selected template
 * and allows the user to interact with it.
 */
@customElement('story-board')
export class Storyboard extends connect(store)(LitElement) {
  static styles = css`
    .container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: 0.5s ease;
      max-height: 95%;
    }

    .mobile-container {
      height: 600px;
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 0 auto;
      transition: 0.5s ease;
    }

    .storyboard {
      height: 100%;
      width: 100%;
      background-color: var(--primary-color);
      overflow: hidden;
    }

    #root-panel {
      height: 100%;
      width: 100%;
      background-color: blue;
    }

    .full-size {
      height: 100%;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }

    .full-height {
      height: 100%;
    }

    .padded {
      padding: var(--extra-tight);
    }

    ui-map {
      display: block;
      height: 100%;
    }

    empty-notice {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #device-tabs {
      width: 150px;
      margin: var(--regular) auto var(--tight) auto;
    }

    #palette-select-container {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      position: absolute;
      top: -42px;
      right: 0px;
    }

    paper-button {
      color: var(--accent-color);
    }

    #palette-change-confirmation-dialog {
      border-radius: var(--tight);
    }
  `;

  /**
   * Additional custom styles.
   */
  @property({ type: Object }) styles = {};

  /**
   * Used for setting template palette.
   */
  @property({ type: String }) selectedPalette: PaletteNames =
    PaletteNames.LIGHT;

  /**
   * Reference to storyboard element.
   */
  @query(`#${STORYBOARD_ID}`) storyboard!: PaperCardElement;

  /**
   * Toast message for local storage failure.
   */
  @query('#failed-local-storage-toast')
  localStorageFailureToast!: PaperToastElement;

  /**
   * Reference to paper dialog modal.
   */
  @query('paper-dialog') paletteConfimationDialog!: PaperDialogElement;

  stateChanged(state: AppCreatorStore) {
    const template = state.template;

    if (state.selectedPalette.name !== this.selectedPalette) {
      this.selectedPalette = state.selectedPalette.name;
    }

    /**
     * Re-render storyboard when switching between templates. We check if
     * the selectedTemplateID property on the store is the same as the
     * template id from the current template config.
     */
    if (
      template.hasOwnProperty('config') &&
      template.config.id !== state.selectedTemplateID
    ) {
      store.dispatch(setSelectedTemplateID(template.config.id));

      this.renderNewTemplate(template);
    } else if (
      /**
       * We want to re-render the storyboard when we switch the template color palette.
       * We do this by checking if the CHANGINGPALETTE event has been emitted.
       */
      state.eventType === EventType.CHANGINGPALETTE
    ) {
      this.renderNewTemplate(template);
    } else if (state.eventType === EventType.CHANGINGTEMPLATE) {
      /**
       * In the case of template changes, we want incrementWidgetIDs after populating the new
       * template with widgets from the previous one.
       */
      store.dispatch(setEventType(EventType.NONE, true));

      this.renderNewTemplate(template);

      try {
        const template = localStorage.getItem('previousTemplate');
        if (template) {
          const widgets = JSON.parse(template).widgets;
          incrementWidgetIDs(widgets);
        }

        localStorage.removeItem('previousTemplate');
      } catch (e) {
        console.error(e);
        this.localStorageFailureToast.open();
      }
    }
  }

  /**
   * Renders new template by calling generateUI and requesting update.
   */
  private renderNewTemplate(template: AppCreatorStore['template']) {
    const { storyboard } = this;
    if (storyboard) {
      storyboard.innerHTML = ``;
      generateUI(template, storyboard);
    }

    this.requestUpdate();
  }

  /**
   * Sets the selected palette in state and opens the confirmation dialog.
   */
  private handlePaletteChange(e: CustomEvent) {
    this.selectedPalette = e.detail.selectedPalette;
    if (this.paletteConfimationDialog) {
      this.paletteConfimationDialog.open();
    }
  }

  /**
   * Called when users confirm on the confirmation dialog when changing palettes.
   */
  private paletteChangeConfirmation() {
    store.dispatch(setPalette(this.selectedPalette));
    store.dispatch(setEventType(EventType.CHANGINGPALETTE, true));
    this.requestUpdate();
  }

  /**
   * Called when users decline palette change.
   */
  private declinePaletteChange() {
    if (this.paletteConfimationDialog) {
      this.paletteConfimationDialog.close();
    }

    this.selectedPalette = store.getState().selectedPalette.name;
  }

  render() {
    const {
      selectedPalette,
      handlePaletteChange,
      paletteChangeConfirmation,
      declinePaletteChange,
      styles,
    } = this;

    const isMobile =
      store.getState().template.config?.device === DeviceType.MOBILE;

    const paletteSelectInput = html`
      <div id="palette-select-container">
        <palette-picker
          @palette-change=${handlePaletteChange}
          selectedPalette=${selectedPalette}
          .showTitle=${false}
        ></palette-picker>
      </div>
    `;

    const paletteChangeConfirmationDialog = html`
      <paper-dialog with-backdrop id="palette-change-confirmation-dialog">
        <h2>Are you sure?</h2>
        <p>
          Changing the template palette will overwrite any applied styles.
        </p>
        <div class="buttons">
          <paper-button @click=${declinePaletteChange}>Decline</paper-button>
          <paper-button
            dialog-confirm
            autofocus
            @click=${paletteChangeConfirmation}
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
    `;

    const localStorageFailureToast = createToastMessage(
      'failed-local-storage-toast',
      'Failed to duplicate template.'
    );

    return html`
      <div
        class=${classMap({
          'mobile-container': isMobile,
          container: !isMobile,
        })}
      >
        ${paletteSelectInput}
        <paper-card
          id="storyboard"
          style=${styleMap(styles)}
          class="storyboard"
        ></paper-card>
        ${paletteChangeConfirmationDialog} ${localStorageFailureToast}
      </div>
    `;
  }

  getStyle(): object {
    return this.styles;
  }
}
