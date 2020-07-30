/**
 * @fileoverview The template wizard widget allows the user to select their desired configuration setting and select a particular template.
 */
import {
  customElement,
  LitElement,
  css,
  property,
  query,
  html,
} from 'lit-element';
import { nothing, TemplateResult } from 'lit-html';
import { DeviceType, Palette } from '../../redux/types/enums';
import { TemplateItem } from '../../client/fetch-templates';
import { PaperDialogElement } from '@polymer/paper-dialog';
import { templatesManager } from '../../data/templates';
import { PaperToastElement } from '@polymer/paper-toast';
import { TemplatesTabItem, TemplatesTab } from '../templates-tab/templates-tab';
import { onSearchEvent } from '../search-bar/search-bar';
import { generateRandomId } from '../../utils/helpers';
import { palette } from '../../utils/palettes';
import '@polymer/paper-progress/paper-progress';
import '@cwmr/paper-chip/paper-chip.js';
import { store } from '../../redux/store';
import { setSelectedTemplate } from '../../redux/actions';

@customElement('template-wizard')
export class TemplateWizard extends LitElement {
  static styles = css`
    #cards-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      margin-top: var(--regular);
      height: 300px;
      overflow-y: scroll;
    }

    template-card {
      width: 200px;
      margin: var(--regular);
    }

    paper-dialog {
      width: 800px;
      height: 500px;
      border-radius: var(--tight);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
    }

    #header-content {
      width: 400px;
      margin: 0 auto;
    }

    .subtitle {
      margin: 0;
      font-size: 1rem;
      color: var(--accent-color);
      font-weight: 500;
    }

    #modal-title {
      text-align: center;
      color: var(--accent-color);
    }

    paper-progress {
      width: 100%;
      height: 20px;
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0px;
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

    #content-body {
      padding: 0px;
      margin: 0px;
      width: 100%;
      height: 90%;
    }

    #configuration-form {
      display: flex;
      flex-direction: column;
      width: 30%;
      border-right: var(--light-border);
      align-items: center;
      padding: var(--tight);
      height: 100%;
    }

    #template-selection {
      width: 70%;
      height: 100%;
      padding: var(--tight);
      overflow: hidden;
    }

    #button-container {
      width: 100%;
      height: 10%;
      padding: 0px;
      margin: 0px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-top: var(--light-border);
    }

    paper-button {
      background-color: var(--accent-color);
      color: var(--primary-color);
      height: 30px;
      font-size: 0.8rem;
      margin-right: var(--regular);
    }

    .input-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .input-label {
      margin: 0px 0px;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent-color);
    }

    input {
      margin: var(--tight) 0px;
    }

    .config-input-container {
      margin: var(--extra-tight) 0px;
      margin-right: 0px;
      width: 90%;
    }

    .config-input {
      border: var(--light-border);
      padding: var(--extra-tight);
      -webkit-border-radius: var(--extra-tight);
      border-radius: var(--extra-tight);
      width: 100%;
      resize: none;
      font-family: inherit;
      background-color: var(--primary-color);
      margin: var(--extra-tight) 0px;
    }

    .config-input:focus {
      border-color: var(--accent-color);
      outline: none;
    }

    .config-select-input {
      width: 94%;
    }

    .row {
      display: flex;
      height: 100%;
      overflow: hidden;
    }

    .form-inputs {
      width: 100%;
      padding: var(--tight);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 auto;
    }

    .disabled-button {
      opacity: 0.5;
    }
  `;

  /**
   * Sets template dialog search query.
   */
  @property({ type: String }) query = '';

  /**
   * Sets device filter.
   */
  @property({ type: String }) deviceFilter: DeviceType = DeviceType.all;

  /**
   * Array of templates.
   */
  @property({ type: Array }) templates: TemplateItem[] = [];

  /**
   * Loading state.
   */
  @property({ type: Boolean }) loading = false;

  /**
   * Reference to dialog element.
   */
  @query('paper-dialog') dialog!: PaperDialogElement;

  /**
   * Reference to dialog element.
   */
  @query('#template-parsing-error') parsingErrorToast!: PaperToastElement;

  /**
   * ID of the currently selected template.
   */
  @property({ type: String }) selectedTemplateID = '';

  /**
   * Configuration object that stores metadata about a template.
   */
  @property({ type: Object }) config: { [key: string]: string } = {
    id: generateRandomId(),
    name: '',
    palette: Palette.light,
  };

  async firstUpdated() {
    try {
      this.loading = true;

      const templates = await templatesManager.fetchTemplates(false);
      if (templates != null) {
        this.templates = templates;
      }
    } catch (e) {
      const fetchErrorToast = this.shadowRoot?.getElementById(
        'fetch-error-toast'
      ) as PaperToastElement;

      if (fetchErrorToast != null) {
        fetchErrorToast.open();
      }
      this.templates = templatesManager.getTemplates();
    } finally {
      this.loading = false;
    }
    this.showTemplateSelectionModal();
  }

  showTemplateSelectionModal() {
    this.dialog.open();
  }

  /**
   * Used for filtering templates.
   */
  handleDeviceFilters(device: DeviceType) {
    this.deviceFilter = device;
  }

  /**
   * Generates an input header for each setting input.
   */
  getInputHeader(title: string) {
    return html`
      <div class="input-header">
        <p class="input-label">${title}</p>
      </div>
    `;
  }

  /**
   * Sets currently selected template id.
   */
  handleTemplateSelection(id: string) {
    this.selectedTemplateID = id;
  }

  /**
   * Returns array of template cards.
   */
  getTemplateCards(showTitle = false): Array<TemplatesTabItem> {
    return this.templates.map(({ id, name, imageUrl, device }) => {
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
            ?selected=${this.selectedTemplateID === id}
            ?showTitle=${showTitle}
            .onSelection=${() => this.handleTemplateSelection(id)}
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
   * Creates a text input element.
   */
  getTextInput(
    title: string,
    value: string,
    placeholder: string,
    key: string,
    disabled: boolean,
    required?: boolean
  ): TemplateResult {
    return html`
    <div class="config-input-container">
        ${this.getInputHeader(title)}
        <input
            class='config-input text-input'
            placeholder=${placeholder}
            @keyup=${(e: Event) => {
              this.config[key] = (e.target as HTMLInputElement).value;
              this.requestUpdate();
            }}
            ?disabled=${disabled}
            ?required=${required}
            value=${value}
        ></input>
    </div>
    `;
  }

  /**
   * Creates a select input element.
   */
  getSelectInput(
    key: string,
    title: string,
    value: string,
    items: string[]
  ): TemplateResult | {} {
    if (items == null) {
      return nothing;
    }
    const optionList = [];
    for (const item of items) {
      optionList.push(html`<option value="${item}" ?selected=${item === value}
        >${item}</option
      >`);
    }

    return html`
      <div class="config-input-container config-select-input">
        ${this.getInputHeader(title)}
        <select
          name="${title}"
          class="config-input"
          .value="${this.config[key]}"
          @change=${(e: Event) => {
            this.config[key] = (e.target as HTMLSelectElement).value;
          }}
        >
          ${optionList}
        </select>
      </div>
    `;
  }

  /**
   * Takes in a template object and applies a selected color palette to it.
   */
  applyConfiguration(template: any, color: Palette) {
    const widgets = template.widgets;
    for (const widgetID in widgets) {
      // Set the background color of panel elements. None panel elements start with a transparent background.
      if (
        widgetID.startsWith('panel') ||
        widgetID.startsWith('button') ||
        widgetID.startsWith('sidemenu')
      ) {
        widgets[widgetID].style.backgroundColor =
          palette[color].backgroundColor;
      }

      // Apply color property on none panel elements.
      if (!widgetID.startsWith('panel')) {
        widgets[widgetID].style.color = palette[color].color;
      }

      // Apply map styling.
      if (widgetID.startsWith('map')) {
        widgets[widgetID].uniqueAttributes.mapStyles = palette[color].map;
      }
    }
  }

  /**
   * Callback triggered on continue button click.
   */
  handleContinueClick() {
    try {
      // Get template from database.
      const template = templatesManager
        .getTemplates()
        .find(({ id }) => id === this.selectedTemplateID)?.template;

      if (template) {
        // Parse template and apply configuration properties.
        const templateJSON = JSON.parse(template);
        templateJSON.config['id'] = this.config.id;
        templateJSON.config['name'] = this.config.name;
        this.applyConfiguration(
          templateJSON,
          this.config.palette.toLowerCase() as Palette
        );

        // Set new template in store.
        store.dispatch(setSelectedTemplate(templateJSON));

        // Close dialog.
        const { dialog } = this;
        if (dialog != null) {
          dialog.close();
        }
      }
    } catch (e) {
      if (this.parsingErrorToast) {
        this.parsingErrorToast.open();
      }
    }
  }

  render() {
    const {
      handleSearch,
      getTemplateCards,
      handleDeviceFilters,
      handleContinueClick,
      deviceFilter,
      query,
      loading,
    } = this;

    /**
     * Get a list of template cards.
     */
    const templateCards = getTemplateCards.call(this, true);
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

    const contentMarkup = loading
      ? nothing
      : html`
          <div id="cards-container">
            ${filteredTemplates.map(({ markup }) => markup)}
            ${filteredTemplates.length === 0 ? emptyNotice : nothing}
          </div>
        `;

    const loadingBar = loading
      ? html`<paper-progress indeterminate></paper-progress>`
      : nothing;

    const sortingChips = html`
      <div id="chips-container">
        <paper-chip
          selectable
          class="${this.deviceFilter === DeviceType.all
            ? 'selected-paper-chip'
            : ''}"
          @click=${() => handleDeviceFilters.call(this, DeviceType.all)}
          >All</paper-chip
        >
        <paper-chip
          selectable
          class="${this.deviceFilter === DeviceType.desktop
            ? 'selected-paper-chip'
            : ''}"
          @click=${() => handleDeviceFilters.call(this, DeviceType.desktop)}
          >Web</paper-chip
        ><paper-chip
          selectable
          class="${this.deviceFilter === DeviceType.mobile
            ? 'selected-paper-chip'
            : ''}"
          @click=${() => handleDeviceFilters.call(this, DeviceType.mobile)}
          >Mobile</paper-chip
        >
      </div>
    `;

    const configurationForm = html`
      <div id="configuration-form">
        <h3>Settings</h3>
        <div class="form-inputs">
          ${this.getTextInput(
            'Template Name:',
            this.config.name,
            'Enter Name',
            'name',
            false,
            true
          )}
          ${this.getSelectInput(
            'palette',
            'Palette',
            this.config.palette,
            Object.keys(Palette).map(
              (palette) => palette[0].toUpperCase() + palette.slice(1)
            )
          )}
        </div>
      </div>
    `;

    const templateSelection = html`
      <div id="template-selection">
        <div id="header-content">
          <h3 id="modal-title">Template Selection</h3>
          <search-bar
            placeholder="Search for template (i.e. side panel)"
            @onsearch=${handleSearch}
          ></search-bar>
          ${sortingChips}
        </div>
        ${contentMarkup}
      </div>
    `;

    const validForm = this.config.name !== '' && this.selectedTemplateID !== '';

    const disabledClass = validForm ? '' : 'disabled-button';

    return html`
      <paper-dialog with-backdrop no-cancel-on-outside-click>
        ${loadingBar}
        <div id="content-body">
          <div class="row">
            ${configurationForm} ${templateSelection}
          </div>
          <div id="button-container">
            <paper-button
              class="${disabledClass}"
              ?disabled=${!validForm}
              @click=${handleContinueClick}
              >Continue</paper-button
            >
          </div>
        </div>
      </paper-dialog>

      <paper-toast
        id="fetch-error-toast"
        text="Unable to fetch the latest templates from the server."
      ></paper-toast>

      <paper-toast
        id="template-parsing-error"
        text="Template parsing failed."
      ></paper-toast>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'template-wizard': TemplateWizard;
  }
}
