/**
 *  @fileoverview The tool-bar widget is the header component
 *  which contains the app title and export action. It handles the logic for
 *  displaying a serialized template string that the user can copy
 *  and import into the code editor.
 */
import {
  LitElement,
  html,
  customElement,
  css,
  query,
  property,
} from 'lit-element';
import { store } from '../../redux/store';
import { PaperDialogElement } from '@polymer/paper-dialog/paper-dialog.js';
import { ROOT_ID, TEMPLATE_TIMESTAMP } from '../../utils/constants';
import { setSelectedTemplate, setEventType } from '../../redux/actions';
import { PaperToastElement } from '@polymer/paper-toast/paper-toast.js';
import {
  deepCloneTemplate,
  storeSnapshotInLocalStorage,
  createToastMessage,
  setUrlParam,
  getWidgetType,
} from '../../utils/helpers';
import { incrementWidgetIDs } from '../../utils/template-generation';
import { EventType, WidgetType } from '../../redux/types/enums';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import { AppCreatorStore } from '../../redux/reducer';

@customElement('tool-bar')
export class ToolBar extends LitElement {
  static prefix = 'Google Earth Engine';
  static suffix = 'App Creator';

  static styles = css`
    #container {
      height: 15px;
      padding: var(--regular);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--light-border);
      background-color: var(--primary-color);
    }

    #app-title-prefix {
      font-weight: 500;
      color: var(--accent-color);
    }

    #app-title-suffix {
      color: var(--app-title-suffix-color);
      font-weight: 400;
    }

    h3 {
      margin: 0;
      padding: 0;
      font-size: 1rem;
    }

    paper-dialog {
      padding: var(--tight);
      border-radius: var(--tight);
      width: 40%;
      max-height: 600px;
    }

    #json-string-container {
      margin: 16px;
      overflow-y: scroll;
      overflow-x: scroll;
      padding: 16px;
      background-color: var(--background-color);
      height: 300px;
    }

    #json-snippet {
      font-family: monospace;
    }

    .action-button {
      background-color: var(--accent-color);
    }

    #cancel-button {
      color: var(--accent-color);
    }

    paper-button {
      margin-right: var(--tight);
    }

    #import-textarea {
      width: calc(100% - 2 * var(--tight) - 44px);
      height: 250px;
      margin-left: 24px;
      padding: var(--tight);
    }

    #import-button {
      background-color: var(--primary-color);
      color: var(--accent-color);
      height: 30px;
      font-size: 0.8rem;
      border: 0.3px solid var(--accent-color);
    }

    #export-button {
      background-color: var(--accent-color);
      color: var(--primary-color);
      height: 30px;
      font-size: 0.8rem;
    }

    #invalid-json-toast {
      background-color: var(--validation-error-red-color);
    }
  `;

  /**
   * Sets currently selected tab on the export dialog.
   */
  @property({ type: Number }) selectedTab = 0;

  /**
   * Reference to the export dialog element.
   */
  @query('#export-dialog') exportDialog!: PaperDialogElement;

  /**
   * Reference to the import dialog element.
   */
  @query('#import-dialog') importDialog!: PaperDialogElement;

  /**
   * Reference to the textarea element.
   */
  @query('#import-textarea') importTextArea!: HTMLTextAreaElement;

  /**
   * Reference to invalid JSON toast widget.
   */
  @query('#invalid-json-toast') invalidJSONToast!: PaperToastElement;

  /**
   * Reference to local storage failure toast widget.
   */
  @query('#failed-local-storage-toast')
  localStorageFailureToast!: PaperToastElement;

  /*
   * Reference to confirmation toast element.
   */
  @query('#copy-confirmation-toast') copyConfirmationToast!: PaperToastElement;

  /**
   * Wraps template string with a working code example.
   */
  private getCodeSnippet(template: string) {
    return `var AppCreator = require('users/msibrahim/app-creator:app-creator-deserializer');

/**
 * Create app instance.
 */
var app = AppCreator.createApp('${template}');

/**
 * Draw app to screen. 
 */
app.draw();    
    `;
  }

  /**
   * Triggered when export button is clicked. It displays the paper dialog which
   * contains the serialized template string.
   */
  private openExportDialog() {
    this.populateSnippet();
    this.exportDialog.open();
  }

  /**
   * Sets text content of json snippet container to either the code snippet
   * or the JSON string based on the selected tab index.
   */
  private populateSnippet() {
    const jsonSnippetContainer = this.shadowRoot?.getElementById(
      'json-snippet'
    );

    if (this.exportDialog == null || jsonSnippetContainer == null) {
      return;
    }

    if (this.selectedTab === 0) {
      // Display code snippet.
      jsonSnippetContainer.textContent = this.getCodeSnippet(
        this.getTemplateString()
      );
    } else if (this.selectedTab === 1) {
      // Display JSON string.
      jsonSnippetContainer.textContent = this.getTemplateString(3);
    }
  }

  /**
   * Callback triggered when switching between tabs on the export dialog.
   */
  private handleSnippetToggle(tabIdx: number) {
    this.selectedTab = tabIdx;

    this.populateSnippet();

    this.requestUpdate();
  }

  /**
   * Triggered when import button is clicked. It displays the paper dialog which
   * allows users to paste a template string.
   */
  private openImportDialog() {
    if (this.importDialog == null) {
      return;
    }

    this.importDialog.open();
  }

  /**
   * Returns the serialized template string with indentation.
   */
  private getTemplateString(space: number = 0) {
    const template = deepCloneTemplate(store.getState().template);
    return JSON.stringify(this.normalizeTemplate(template), null, space);
  }

  /**
   * Normalize template.
   */
  private normalizeTemplate(template: AppCreatorStore['template']) {
    const { widgets } = template;
    for (const id in widgets) {
      const type = getWidgetType(id);
      if (type === WidgetType.SELECT) {
        const items = widgets[id].uniqueAttributes.items;
        widgets[
          id
        ].uniqueAttributes.items = this.getArrayStringFromCommaSeparatedValues(
          items
        );
      } else if (type === WidgetType.CHART) {
        const colors = widgets[id].uniqueAttributes.color;
        widgets[
          id
        ].uniqueAttributes.color = this.getArrayStringFromCommaSeparatedValues(
          colors
        );

        const dataTable = widgets[id].uniqueAttributes.dataTable;
        widgets[id].uniqueAttributes.dataTable = this.normalizeDataTable(
          dataTable
        );
      }
    }

    return template;
  }

  /**
   * Correctly formats dataTable into JSON string.
   */
  private normalizeDataTable(dataTable: string) {
    const withQuotes = dataTable.replace(/[a-zA-Z]+(?=:)/g, (key: string) => {
      return `'${key}'`;
    });
    // Filter white spaces.
    return withQuotes.replace(/[\t\n\r ]/g, '');
  }

  /**
   * Converts a string of comma separated values to a serialized array.
   * "Javascript, python" => "["Javascript","Python"]".
   */
  private getArrayStringFromCommaSeparatedValues(values: string) {
    const result = [];
    const valuesArray = values.split(',');
    for (const value of valuesArray) {
      const trimmedValue = value.trim();
      if (trimmedValue !== '') {
        result.push(`\\"${trimmedValue}\\"`);
      }
    }

    return result.length > 0 ? `[${result.join(',')}]` : '';
  }

  /**
   * Adds template string to clipboard.
   */
  private copy() {
    const textArea = document.createElement('textarea');
    // We get the template string without indentation and with escaped single quotes.
    if (this.selectedTab === 0) {
      textArea.value = this.getCodeSnippet(
        this.getTemplateString().replace(/'/g, "\\'")
      );
    } else if (this.selectedTab === 1) {
      textArea.value = this.getTemplateString().replace(/'/g, "\\'");
    }

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    this.copyConfirmationToast.open();
  }

  /**
   * Imports template from JSON provided by the user.
   */
  private importTemplate() {
    // Get textarea input element.
    if (this.importTextArea == null) {
      return;
    }

    // Get dialog element.
    if (this.importDialog == null) {
      return;
    }

    // Get template json string.
    let template = this.importTextArea.value.replace(/\\'/g, "'").trim();
    template = template.slice(
      template.indexOf('{'),
      template.lastIndexOf('}') + 1
    );

    try {
      const templateJSON = JSON.parse(template);

      // If the JSON doesn't contain a root_id (i.e. panel-template-0)
      // then it is not a valid template and thus we need to throw an error.
      if (!templateJSON.widgets.hasOwnProperty(ROOT_ID)) {
        throw new Error('Root ID (panel-template-0) not present...');
      }

      // Update the store with the new template.
      store.dispatch(setSelectedTemplate(templateJSON));

      incrementWidgetIDs(templateJSON.widgets);

      // Dispatch event to re-render the story-board.
      store.dispatch(setEventType(EventType.IMPORTING));

      this.importDialog.close();

      this.clearTextArea('import-textarea');
    } catch (e) {
      this.invalidJSONToast.open();
    }
  }

  // Empties text area input.
  private clearTextArea(id: string) {
    const textarea = this.shadowRoot?.querySelector(
      `#${id}`
    ) as HTMLTextAreaElement;

    if (textarea == null) {
      return;
    }

    textarea.value = '';
  }

  /**
   * Callback triggered when duplicate button is clicked.
   */
  private handleDuplicateButtonAction() {
    try {
      /**
       * Get current timestamp to store it as a key.
       */
      const timestamp = Date.now();

      storeSnapshotInLocalStorage(timestamp);

      const url = setUrlParam(TEMPLATE_TIMESTAMP, timestamp.toString());

      window.open(url.href);
    } catch (e) {
      this.localStorageFailureToast.open();
    }
  }

  render() {
    const {
      openExportDialog,
      openImportDialog,
      importTemplate,
      clearTextArea,
      handleDuplicateButtonAction,
      handleSnippetToggle,
      copy,
    } = this;

    const exportDialog = html`
      <paper-dialog id="export-dialog" with-backdrop no-cancel-on-outside-click>
        <h2>Paste string in the Earth Engine Code Editor</h2>
        <paper-tabs selected=${this.selectedTab} noink>
          <paper-tab @click=${() => handleSnippetToggle.call(this, 0)}>
            Code
          </paper-tab>
          <paper-tab @click=${() => handleSnippetToggle.call(this, 1)}>
            JSON
          </paper-tab>
        </paper-tabs>
        <paper-dialog-scrollable id="json-string-container">
          <pre><code id="json-snippet"></code
          ></pre>
        </paper-dialog-scrollable>
        <div class="buttons">
          <paper-button id="cancel-button" dialog-dismiss>Cancel</paper-button>
          <paper-button
            class="action-button"
            dialog-confirm
            autofocus
            @click=${copy}
            >Copy</paper-button
          >
        </div>
      </paper-dialog>
    `;

    const importDialog = html`
      <paper-dialog id="import-dialog" with-backdrop no-cancel-on-outside-click>
        <h2>Paste template string below</h2>
        <textarea
          id="import-textarea"
          class="attribute-input text-input"
          placeholder="Paste JSON string here (e.g. { panel-template-0: { ... } })"
          rows="4"
        ></textarea>
        <div class="buttons">
          <paper-button
            id="cancel-button"
            @click=${() => {
              clearTextArea.call(this, 'import-textarea');
            }}
            dialog-dismiss
            >Cancel</paper-button
          >
          <paper-button class="action-button" autofocus @click=${importTemplate}
            >Import</paper-button
          >
        </div>
      </paper-dialog>
    `;

    const invalidJSONToast = createToastMessage(
      'invalid-json-toast',
      'Failed to duplicate template.'
    );

    const localStorageFailureToast = createToastMessage(
      'failed-local-storage-toast',
      'Failed to duplicate template.'
    );

    const copyConfirmationToast = createToastMessage(
      'copy-confirmation-toast',
      'Snippet copied to clipboard.',
      5000
    );

    return html`
      <div id="container">
        <h3>
          <strong id="app-title-prefix">${ToolBar.prefix}</strong>
          <span id="app-title-suffix">${ToolBar.suffix}</span>
        </h3>

        <div>
          <paper-button id="import-button" @click=${handleDuplicateButtonAction}
            >Duplicate</paper-button
          >
          <paper-button id="import-button" @click=${openImportDialog}
            >Import</paper-button
          >
          <paper-button id="export-button" @click=${openExportDialog}
            >Export</paper-button
          >
        </div>

        ${importDialog} ${exportDialog} ${invalidJSONToast}
        ${localStorageFailureToast} ${copyConfirmationToast}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tool-bar': ToolBar;
  }
}
