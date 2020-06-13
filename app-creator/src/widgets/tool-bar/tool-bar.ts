/**
 *  @fileoverview The tool-bar widget is the header component
 *  which contains the app title and export actions.
 */
import { LitElement, html, customElement, css } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import { store } from '../../redux/store';

// The paper dialog widget appears on export button click and is used to display the serialized template string.
import '@polymer/paper-dialog/paper-dialog.js';
import { PaperDialogElement } from '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

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

    #dialog {
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
      max-height: 400px;
    }

    #json-snippet {
      font-family: monospace;
    }

    #copy-button {
      background-color: var(--accent-color);
    }

    #cancel-button {
      color: var(--accent-color);
    }

    paper-button {
      margin-right: var(--tight);
    }
  `;

  openDialog() {
    const dialog = this.shadowRoot?.getElementById('dialog');
    const jsonSnippetContainer = this.shadowRoot?.getElementById(
      'json-snippet'
    );

    if (dialog == null || jsonSnippetContainer == null) {
      return;
    }
    jsonSnippetContainer.innerHTML = this.getTemplateString();

    (dialog as PaperDialogElement).open();
  }

  getTemplateString() {
    const template = store.getState().template;
    // Remove widget reference from JSON.
    for (const key in template) {
      if (typeof template[key] === 'object' && !Array.isArray(template[key])) {
        delete template[key].widgetRef;
      }
    }
    return JSON.stringify(template, undefined, 3);
  }

  copy() {
    const copyText = this.shadowRoot?.getElementById('json-snippet');
    if (copyText == null) {
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = copyText.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  }

  render() {
    const { openDialog, copy } = this;
    return html`
      <div id="container">
        <h3>
          <strong id="app-title-prefix">${ToolBar.prefix}</strong>
          <span id="app-title-suffix">${ToolBar.suffix}</span>
        </h3>
        <ui-button
          .raised=${false}
          id="export-button"
          label="export"
          color="secondary"
          @click=${openDialog}
        ></ui-button>

        <paper-dialog id="dialog">
          <h2>Paste string in EE Code Editor</h2>
          <paper-dialog-scrollable id="json-string-container">
            <pre><code id="json-snippet"></code
          ></pre>
          </paper-dialog-scrollable>
          <div class="buttons">
            <paper-button id="cancel-button" dialog-dismiss
              >Cancel</paper-button
            >
            <paper-button
              id="copy-button"
              dialog-confirm
              autofocus
              @click=${copy}
              >Copy</paper-button
            >
          </div>
        </paper-dialog>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tool-bar': ToolBar;
  }
}
