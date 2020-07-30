/**
 *  @fileoverview The palette-picker widget handles palette changes across the app creator.
 */
import { css, customElement, html, LitElement, property } from 'lit-element';
import { nothing } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { PaletteNames } from '../../redux/types/enums';

export interface Palette {
  name: PaletteNames;
  backgroundColor: string;
  color: string;
  map: string;
}

@customElement('palette-picker')
export class PalettePicker extends LitElement {
  static styles = css`
    select {
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

    .select-input-container {
      margin: var(--extra-tight) 0px;
      margin-right: 0px;
      width: 100%;
    }

    #input-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    #input-label {
      margin: 0px 0px;
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent-color);
    }
  `;

  static readonly palette: Record<PaletteNames, Palette> = {
    light: {
      name: PaletteNames.light,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      map: 'standard',
    },
    silver: {
      name: PaletteNames.silver,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      map: 'silver',
    },
    dark: {
      name: PaletteNames.dark,
      backgroundColor: '#000000',
      color: '#FFFFFF',
      map: 'dark',
    },
    night: {
      name: PaletteNames.night,
      backgroundColor: '#17263C',
      color: '#FFFFFF',
      map: 'night',
    },
    retro: {
      name: PaletteNames.retro,
      backgroundColor: '#DFD2AE',
      color: '#000000',
      map: 'retro',
    },
    aubergine: {
      name: PaletteNames.aubergine,
      backgroundColor: '#0E1626',
      color: '#FFFFFF',
      map: 'aubergine',
    },
  };

  /**
   * Additional custom styles.
   */
  @property({ type: Object }) styles = {};

  /**
   * Determines whether a title is displayed on top of the select input or not.
   */
  @property({ type: Boolean }) showTitle = true;

  /**
   * Selected palette.
   */
  @property({ type: String }) selectedPalette: PaletteNames =
    PaletteNames.light;

  /**
   * Callback triggered on new palette selection.
   */
  handlePaletteSelection(e: Event) {
    const newPalette = (e.target as HTMLSelectElement).value as PaletteNames;
    this.selectedPalette = newPalette;

    const event = new CustomEvent('palette-change', {
      detail: {
        selectedPalette: newPalette,
      },
    });

    this.dispatchEvent(event);

    this.requestUpdate();
  }

  render() {
    const { selectedPalette, showTitle, handlePaletteSelection, styles } = this;

    const optionList = html`
      ${Object.keys(PaletteNames).map(
        (palette) => html`<option
          value="${palette}"
          ?selected=${this.selectedPalette === palette}
          >${palette}</option
        >`
      )}
    `;

    const header = showTitle
      ? html`
          <div id="input-header">
            <p id="input-label">Palette</p>
          </div>
        `
      : nothing;

    return html`
      <div class="select-input-container" style=${styleMap(styles)}>
        ${header}
        <select
          name="Palette"
          .value="${selectedPalette}"
          @change=${handlePaletteSelection}
        >
          ${optionList}
        </select>
      </div>
    `;
  }
}
