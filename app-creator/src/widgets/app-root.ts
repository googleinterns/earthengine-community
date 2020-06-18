/**
 *  @fileoverview The app-root widget is the starting point of our application
 *  in which all other widgets are rendered
 */
import { LitElement, html, customElement, css, property } from 'lit-element';
import { nothing } from 'lit-html';
import './tool-bar/tool-bar';
import './actions-panel/actions-panel';
import './tab-container/tab-container';
import './story-board/story-board';
import './search-bar/search-bar';
import { PaperDialogElement } from '@polymer/paper-dialog/paper-dialog.js';
import { onSearchEvent } from './search-bar/search-bar';
import { TemplatesTab } from './templates-tab/templates-tab';
import { database } from '../templates/templates-database';
import { store } from '../redux/store';
import { setSelectedTemplate } from '../redux/actions';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    #app {
      height: 100%;
      width: 100%;
    }

    #container {
      display: flex;
      width: 100%;
      height: calc(100vh - 47px);
    }

    #storyboard {
      height: 95%;
      width: 90%;
    }

    #storyboard-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    #cards-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      margin-top: var(--regular);
    }

    template-card {
      width: 200px;
      margin: var(--regular);
    }

    #dialog {
      min-width: 650px;
      max-width: 60%;
      min-height: 450px;
      max-height: 60%;
      padding: var(--regular);
      border-radius: var(--tight);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
    }

    #header-content {
      width: 400px;
    }

    .subtitle {
      margin: 0;
      font-size: 1rem;
      color: var(--accent-color);
      font-weight: 500;
    }

    #modal-title {
      text-align: center;
      font-weight: 500;
      color: var(--accent-color);
    }
  `;

  /**
   * Sets template dialog search query.
   */
  @property({ type: String }) query = '';

  firstUpdated() {
    this.showTemplateSelectionModal();
  }

  showTemplateSelectionModal() {
    const dialog = this.shadowRoot?.getElementById('dialog');
    if (dialog != null) {
      (dialog as PaperDialogElement).open();
    }
  }

  render() {
    const { handleSearch, getTemplateCards, query } = this;

    const templateCards = getTemplateCards.call(this, true);
    const filteredTemplates = TemplatesTab.filterTemplates(
      templateCards,
      query
    );

    const emptyNotice =
      filteredTemplates.length === 0
        ? html`
            <empty-notice
              id="empty-notice"
              icon="search"
              message="No templates available. Please search again."
              size="large"
              bold
            ></empty-notice>
          `
        : nothing;

    return html`
      <div id="app">
        <tool-bar></tool-bar>
        <div id="container">
          <actions-panel></actions-panel>
          <div id="storyboard-container">
            <story-board id="storyboard"> </story-board>
          </div>

          <paper-dialog id="dialog" with-backdrop no-cancel-on-outside-click>
            <div id="header-content">
              <h2 id="modal-title">Select Template</h2>
              <search-bar
                placeholder="Search for template"
                @onsearch=${handleSearch}
              ></search-bar>
            </div>
            <div id="cards-container">
              ${filteredTemplates.map(({ markup }) => markup)} ${emptyNotice}
            </div>
            <div class="buttons"></div>
          </paper-dialog>
        </div>
      </div>
    `;
  }

  createSelectionCallback(template: string) {
    return () => {
      const dialog = this.shadowRoot?.getElementById('dialog');
      if (dialog != null) {
        (dialog as PaperDialogElement).close();
        store.dispatch(setSelectedTemplate(JSON.parse(template)));
      }
    };
  }

  getTemplateCards(showTitle = false) {
    return database.map(({ id, name, variant, template }) => {
      const templateData = template[variant];
      return {
        id,
        name,
        markup: html`
          ${showTitle ? nothing : html`<h6 class="subtitle">${name}</h6>`}
          <template-card
            id="${id}"
            title="${name}"
            imageUrl="${templateData.imageUrl}"
            ?showTitle=${showTitle}
            .onSelection=${this.createSelectionCallback(templateData.template)}
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
    this.query = query;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
