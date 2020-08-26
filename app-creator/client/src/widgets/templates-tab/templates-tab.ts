/**
 *  @fileoverview The templates-tab widget contains the different templates that the user can use for their earth engine app.
 */
import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
} from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { onSearchEvent } from '../search-bar/search-bar';
import { store } from '../../redux/store';
import { setSelectedTemplate } from '../../redux/actions';
import { templatesManager } from '../../data/templates';
import { connect } from 'pwa-helpers';
import { AppCreatorStore } from '../../redux/reducer';
import { DeviceType } from '../../redux/types/enums';
import { classMap } from 'lit-html/directives/class-map';
import {
  chips,
  storeSnapshotInLocalStorage,
  setUrlParam,
} from '../../utils/helpers';
import { transferData } from '../../utils/template-generation';
import { PaperDialogElement } from '@polymer/paper-dialog';
import { TEMPLATE_TIMESTAMP } from '../../utils/constants';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '../tab-container/tab-container';
import '../draggable-widget/draggable-widget';
import '../ui-label/ui-label';
import '../ui-button/ui-button';
import '../ui-select/ui-select';
import '../ui-checkbox/ui-checkbox';
import '../ui-textbox/ui-textbox';
import '../ui-slider/ui-slider';
import '../ui-panel/ui-panel';
import '../ui-chart/ui-chart';
import '../search-bar/search-bar';
import '../empty-notice/empty-notice';
import '../template-card/template-card';

export interface TemplatesTabItem {
  id: string;
  name: string;
  markup: TemplateResult;
  device: DeviceType;
}

@customElement('templates-tab')
export class TemplatesTab extends connect(store)(LitElement) {
  static styles = css`
    paper-button {
      color: var(--accent-color);
    }

    .selected-paper-chip {
      background-color: var(--accent-color);
      color: var(--primary-color);
    }

    .button-chip {
      padding: var(--tight) 0px;
      height: 24px;
      border-radius: 12px;
      font-size: 0.8rem;
      text-transform: none;
    }

    .subtitle {
      margin: var(--regular) 0px var(--tight) 0px;
      color: var(--accent-color);
    }

    #cards-container {
      margin-top: var(--regular);
    }

    #chips-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: var(--tight);
    }

    #template-change-confirmation-dialog {
      border-radius: var(--tight);
    }
  `;

  /**
   * Represents the id of the currently selected template. Used to rerender templates tab.
   */
  @property({ type: String }) selectedTemplateID: string = '';

  /**
   * ID of template to be selected.
   */
  @property({ type: String }) requestedTemplateID: string = '';

  /**
   * Sets the search query.
   */
  @property({ type: String }) query = '';

  /**
   * Sets device filter.
   */
  @property({ type: String }) deviceFilter = DeviceType.ALL;

  /**
   * Reference to template change confirmation dialog.
   */
  @query('#template-change-confirmation-dialog')
  templateChangeConfirmationDialog!: PaperDialogElement;

  stateChanged(state: AppCreatorStore) {
    if (state.template.config.parentID !== this.selectedTemplateID) {
      this.selectedTemplateID = state.template.config.parentID;
      this.requestUpdate();
    }
  }

  private getTemplateCards(showTitle = false) {
    const templates = templatesManager.getTemplates();
    return templates.map(({ id, name, imageUrl, device }) => {
      return {
        id,
        name,
        device,
        markup: html`
          ${showTitle ? nothing : html`<h6 class="subtitle">${name}</h6>`}
          <template-card
            id="${id}"
            title="${name}"
            imageUrl="${imageUrl}"
            ?showTitle=${showTitle}
            ?selected=${store.getState().template.config.parentID === id}
            .onSelection=${this.handleTemplateCardSelection(id)}
          ></template-card>
        `,
      };
    });
  }

  /**
   * Returns widgets with names and ids that include the search query.
   */
  static filterTemplates(
    templateCards: TemplatesTabItem[],
    query: string,
    deviceFilter: DeviceType
  ): Array<TemplatesTabItem> {
    return templateCards.filter(({ id, name, device }) => {
      // Matches either the ID or name.
      const queryMatch =
        id.match(new RegExp(`${query}`, 'i')) ||
        name.match(new RegExp(`${query}`, 'i'));

      // And matches the device type (or all).
      const deviceMatch =
        deviceFilter === DeviceType.ALL || device === deviceFilter;

      return queryMatch && deviceMatch;
    });
  }

  /**
   * Callback triggered on template card selection.
   */
  private handleTemplateCardSelection(id: string) {
    return () => {
      this.requestedTemplateID = id;
      if (this.templateChangeConfirmationDialog) {
        this.templateChangeConfirmationDialog.open();
      }
    };
  }

  /**
   * Callback triggered on template change confirmation.
   */
  private handleTemplateChangeConfirmation() {
    const template = templatesManager
      .getTemplates()
      .find(({ id }) => id === this.requestedTemplateID)?.template;

    if (template) {
      try {
        const timestamp = Date.now();

        setUrlParam(TEMPLATE_TIMESTAMP, timestamp.toString());

        storeSnapshotInLocalStorage(timestamp);

        // Replace the redux store with the new template and trigger a re-render.
        const templateJSON = JSON.parse(template);

        store.dispatch(setSelectedTemplate(templateJSON));

        transferData();
      } catch (e) {
        console.error(e);
      }
    }

    this.templateChangeConfirmationDialog.close();

    this.requestUpdate();
  }

  /**
   * Callback triggered on template change dismiss.
   */
  private handleTemplateChangeDismiss() {
    this.requestedTemplateID = '';
    this.templateChangeConfirmationDialog.close();
  }

  /**
   * Sets the query property when an onsearch event is dispatched from the
   * searchbar widget.
   */
  private handleSearch({ detail: { query } }: onSearchEvent) {
    this.query = query.trim();
  }

  render() {
    const { query, deviceFilter, getTemplateCards, handleSearch } = this;

    const templateCards = getTemplateCards.call(this);

    const filteredTemplates = TemplatesTab.filterTemplates(
      templateCards,
      query,
      deviceFilter
    );

    const emptyNotice = html`
      <empty-notice
        id="empty-notice"
        icon="search"
        message='No templates match "${query}". Please search again.'
        size="large"
        bold
      ></empty-notice>
    `;

    const sortingChips = html`
      <div id="chips-container">
        ${chips.map(({ label, device }) => {
          return html`
            <paper-button
              class=${classMap({
                'selected-paper-chip': this.deviceFilter === device,
                'button-chip': true,
              })}
              @click=${() => {
                this.deviceFilter = device;
              }}
            >
              ${label}
            </paper-button>
          `;
        })}
      </div>
    `;

    const templateChangeConfirmationDialog = html`
      <paper-dialog with-backdrop id="template-change-confirmation-dialog">
        <h2>Are you sure?</h2>
        <p>
          Changing templates will discard any applied styles or layouts.
        </p>
        <div class="buttons">
          <paper-button @click=${this.handleTemplateChangeDismiss}
            >Decline</paper-button
          >
          <paper-button
            @click=${this.handleTemplateChangeConfirmation}
            autofocus
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
    `;

    return html`
      <tab-container title="Templates">
        <search-bar
          placeholder="Search for template (ie. side panel)"
          @onsearch=${handleSearch}
        ></search-bar>
        ${sortingChips}
        <div id="cards-container">
          ${filteredTemplates.map(({ markup }) => markup)}
          ${filteredTemplates.length === 0 ? emptyNotice : nothing}
        </div>
        ${templateChangeConfirmationDialog}
      </tab-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'templates-tab': TemplatesTab;
  }
}
