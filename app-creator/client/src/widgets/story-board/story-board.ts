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
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { connect } from 'pwa-helpers';
import { DeviceType, EventType, Palette } from '../../redux/types/enums';
import { store } from '../../redux/store';
import { AppCreatorStore } from '../../redux/reducer';
import { PaperCardElement } from '@polymer/paper-card/paper-card.js';
import { generateUI } from '../../utils/template-generation';
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
      top: -36px;
      right: 0px;
      margin: var(--tight) 0px;
    }

    #select-palette {
      padding: var(--extra-tight);
      border-radius: var(--extra-tight);
      background-color: white;
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
  @property({ type: String }) selectedPalette: Palette = Palette.light;

  /**
   * Used for temporarily storing requested palette. This is required because we want
   * to rollback to the old palette if the user declines the confirmation dialog.
   */
  @property({ type: String }) requestedPalette: Palette = Palette.light;

  /**
   * Reference to storyboard element.
   */
  @query(`#${STORYBOARD_ID}`) storyboard!: PaperCardElement;

  /**
   * Reference to paper dialog modal.
   */
  @query('paper-dialog') paletteConfimationDialog!: PaperDialogElement;

  /**
   * Reference to palette select input element.
   */
  @query('#select-palette') paletteSelect!: HTMLSelectElement;

  stateChanged(state: AppCreatorStore) {
    const template = state.template;

    /**
     * Re-render storyboard when switching between templates. We check if
     * the selectedTemplateID property on the store is the same as the
     * template id from the current template config.
     */
    if (
      (template.hasOwnProperty('config') &&
        template.config.id !== state.selectedTemplateID) ||
      state.eventType === EventType.changingPalette
    ) {
      store.dispatch(setSelectedTemplateID(template.config.id));

      this.clearSelectedPalette();

      this.renderNewTemplate(template);
    }

    /**
     * We want to Re-render the storyboard when we switch the template color palette.
     * We do this by checking if the changingPalette event has been emitted.
     */
    if (state.eventType === EventType.changingPalette) {
      store.dispatch(setEventType(EventType.none, true));

      this.renderNewTemplate(template);
    }

    this.requestUpdate();
  }

  /**
   * Clears the value of the palette select input and restores initial state.
   */
  clearSelectedPalette() {
    if (this.paletteSelect) {
      this.paletteSelect.value = '';
    }
    this.selectedPalette = Palette.light;
    this.requestedPalette = Palette.light;
  }

  /**
   * Renders new template by calling generateUI and requesting update.
   */
  renderNewTemplate(template: AppCreatorStore['template']) {
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
  handlePaletteChange(e: Event) {
    this.requestedPalette = (e.target as HTMLSelectElement).value as Palette;
    if (this.paletteConfimationDialog) {
      this.paletteConfimationDialog.open();
    }
  }

  /**
   * Called when users confirm on the confirmation dialog when changing palettes.
   */
  paletteChangeConfirmation() {
    this.selectedPalette = this.requestedPalette;
    store.dispatch(setPalette(this.selectedPalette));
    store.dispatch(setEventType(EventType.changingPalette, true));
  }

  /**
   * Callback triggered on change palette confirmation dismiss dialog.
   */
  handleConfirmationDismiss() {
    if (this.paletteConfimationDialog) {
      this.paletteConfimationDialog.close();
    }
    if (this.paletteSelect) {
      this.paletteSelect.value = this.selectedPalette;
      this.requestedPalette = this.selectedPalette;
    }
  }

  render() {
    const {
      styles,
      handlePaletteChange,
      paletteChangeConfirmation,
      handleConfirmationDismiss,
    } = this;

    const isMobile =
      store.getState().template.config?.device === DeviceType.mobile;

    const paletteSelectInput = html`
      <div id="palette-select-container">
        <select
          name="Select palette"
          id="select-palette"
          @change=${handlePaletteChange}
        >
          <option value="" disabled selected>Change Palette</option>
          ${Object.keys(Palette).map(
            (palette) => html`<option value=${palette}>${palette}</option>`
          )}
        </select>
      </div>
    `;

    const paletteChangeConfirmationDialog = html`
      <paper-dialog with-backdrop id="palette-change-confirmation-dialog">
        <h2>Are you sure you?</h2>
        <p>
          Changing the template palette will overwrite any applied styles.
        </p>
        <div class="buttons">
          <paper-button @click=${handleConfirmationDismiss}
            >Decline</paper-button
          >
          <paper-button
            dialog-confirm
            autofocus
            @click=${paletteChangeConfirmation}
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
    `;

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
        ${paletteChangeConfirmationDialog}
      </div>
    `;
  }

  getStyle(): object {
    return this.styles;
  }
}
