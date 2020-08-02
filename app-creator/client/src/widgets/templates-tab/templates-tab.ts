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
import {
  setSelectedTemplate,
  updateWidgetMetaData,
  addWidgetMetaData,
  updateWidgetChildren,
  setEventType,
} from '../../redux/actions';
import { templatesManager } from '../../data/templates';
import { connect } from 'pwa-helpers';
import { AppCreatorStore, WidgetMetaData } from '../../redux/reducer';
import { DeviceType, EventType } from '../../redux/types/enums';
import { classMap } from 'lit-html/directives/class-map';
import { chips, deepCloneTemplate } from '../../utils/helpers';
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
import '@cwmr/paper-chip/paper-chip.js';
import { PaperDialogElement } from '@polymer/paper-dialog';
import { ROOT_ID } from '../../utils/constants';
import { getWidgetElement } from '../../utils/template-generation';

export interface TemplatesTabItem {
  id: string;
  name: string;
  markup: TemplateResult;
  device: DeviceType;
}

@customElement('templates-tab')
export class TemplatesTab extends connect(store)(LitElement) {
  static styles = css`
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

    paper-chip {
      margin: 0px var(--extra-tight);
      background-color: var(--primary-color);
      color: var(--accent-color);
    }

    .selected-paper-chip {
      background-color: var(--accent-color);
      color: var(--primary-color);
    }

    paper-button {
      color: var(--accent-color);
    }

    #template-change-confirmation-dialog {
      border-radius: var(--tight);
    }
  `;

  stateChanged(state: AppCreatorStore) {
    if (state.template.config.parentID !== this.selectedTemplateID) {
      this.selectedTemplateID = state.template.config.parentID;
      this.requestUpdate();
    }
  }

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
  @property({ type: String }) deviceFilter = DeviceType.all;

  /**
   * Reference to template change confirmation dialog.
   */
  @query('#template-change-confirmation-dialog')
  templateChangeConfirmationDialog!: PaperDialogElement;

  /**
   * Returns widgets with names and ids that include the search query.
   */
  static filterTemplates(
    templateCards: TemplatesTabItem[],
    query: string,
    deviceFilter: DeviceType
  ): Array<TemplatesTabItem> {
    return templateCards.filter(({ id, name, device }) => {
      const lowerCasedQuery = query.toLowerCase();
      // Matches either the ID or name.
      const queryMatch =
        id.match(new RegExp(`.*${lowerCasedQuery}.*`, 'i')) ||
        name.match(new RegExp(`.*${lowerCasedQuery}.*`, 'i'));

      // And matches the device type (or all).
      const deviceMatch =
        deviceFilter === DeviceType.all || device === deviceFilter;

      return queryMatch && deviceMatch;
    });
  }

  /**
   * Callback triggered on template card selection.
   */
  handleTemplateCardSelection(id: string) {
    return () => {
      this.requestedTemplateID = id;
      if (this.templateChangeConfirmationDialog) {
        this.templateChangeConfirmationDialog.open();
      }
    };
  }

  /**
   * Returns a list template card instances that the user can switch to.
   */
  getTemplateCards(showTitle = false) {
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
   * Sets the query property when an onsearch event is dispatched from the
   * searchbar widget.
   */
  handleSearch({ detail: { query } }: onSearchEvent) {
    this.query = query.trim();
  }

  /**
   * Callback triggered on template change dismiss.
   */
  handleTemplateChangeDismiss() {
    this.requestedTemplateID = '';
    if (this.templateChangeConfirmationDialog) {
      this.templateChangeConfirmationDialog.close();
    }
  }

  /**
   * Callback triggered on template change confirmation.
   */
  handleTemplateChangeConfirmation() {
    const template = templatesManager
      .getTemplates()
      .find(({ id }) => id === this.requestedTemplateID)?.template;

    if (template) {
      try {
        // Saving current template string in localStorage so we can transfer data across.
        const currentTemplate = JSON.stringify(
          deepCloneTemplate(store.getState().template)
        );
        localStorage.setItem('previousTemplate', currentTemplate);

        // Replace the redux store with the new template and trigger a re-render.
        const templateJSON = JSON.parse(template);
        store.dispatch(setSelectedTemplate(templateJSON));

        this.transferData();
      } catch (e) {
        console.error(e);
      }
    }

    if (this.templateChangeConfirmationDialog) {
      this.templateChangeConfirmationDialog.close();
    }

    this.requestUpdate();
  }

  /**
   * Retrieves previous template from store and populates user added widgets.
   */
  transferData() {
    try {
      const template = localStorage.getItem('previousTemplate');

      if (template) {
        const widgets = JSON.parse(template).widgets;
        const panelIDs = [];

        // Get all panels that are not the root and that exists in the new and old template.
        for (const widgetID in widgets) {
          if (
            widgetID !== ROOT_ID &&
            (widgetID.startsWith('panel') || widgetID.startsWith('sidemenu')) &&
            store.getState().template.widgets.hasOwnProperty(widgetID)
          ) {
            panelIDs.push(widgetID);
          }
        }

        /**
         * Populating store with widgets that share the same IDs.
         */
        for (const panelID of panelIDs) {
          for (const child of widgets[panelID].children) {
            const childMetaData: WidgetMetaData = widgets[child];
            const { id, uniqueAttributes, style } = childMetaData;

            const { element } = getWidgetElement(childMetaData);
            const newID = id.split('-').join('-template-');
            store.dispatch(
              addWidgetMetaData(newID, element, uniqueAttributes, style)
            );

            store.dispatch(
              updateWidgetChildren(panelID, [
                ...store.getState().template.widgets[panelID].children,
                newID,
              ])
            );
          }
        }

        store.dispatch(setEventType(EventType.changingPalette, true));
      }
    } catch (e) {
      throw e;
    }
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
            <paper-chip
              selectable
              class=${classMap({
                'selected-paper-chip': this.deviceFilter === device,
              })}
              @click=${() => {
                this.deviceFilter = device;
              }}
              >${label}</paper-chip
            >
          `;
        })}
      </div>
    `;

    const templateChangeConfirmationDialog = html`
      <paper-dialog with-backdrop id="template-change-confirmation-dialog">
        <h2>Are you sure you?</h2>
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
