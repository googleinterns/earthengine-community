/**
 * @license
 * Copyright 2020 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview The palette-picker widget handles palette changes across the
 * app creator.
 */

import {css, customElement, html, LitElement, property} from 'lit-element';
import {nothing} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map';
import {PaletteNames} from '../../redux/types/enums';

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
      name: PaletteNames.LIGHT,
      backgroundColor: '#ffffff',
      color: '#000000',
      map: 'standard',
    },
    silver: {
      name: PaletteNames.SILVER,
      backgroundColor: '#ffffff',
      color: '#000000',
      map: 'silver',
    },
    dark: {
      name: PaletteNames.DARK,
      backgroundColor: '#000000',
      color: '#ffffff',
      map: 'dark',
    },
    night: {
      name: PaletteNames.NIGHT,
      backgroundColor: '#17263c',
      color: '#ffffff',
      map: 'night',
    },
    retro: {
      name: PaletteNames.RETRO,
      backgroundColor: '#dfd2ae',
      color: '#000000',
      map: 'retro',
    },
    aubergine: {
      name: PaletteNames.AUBERGINE,
      backgroundColor: '#0e1626',
      color: '#ffffff',
      map: 'aubergine',
    },
  };

  /**
   * Additional custom styles.
   */
  @property({type: Object}) styles = {};

  /**
   * Determines whether a title is displayed on top of the select input or not.
   */
  @property({type: Boolean}) showTitle = true;

  /**
   * Selected palette.
   */
  @property({type: String}) selectedPalette: PaletteNames = PaletteNames.LIGHT;

  /**
   * Callback triggered on new palette selection.
   */
  private handlePaletteSelection(e: Event) {
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
    const {selectedPalette, showTitle, handlePaletteSelection, styles} = this;

    const optionList = html`
      ${Object.keys(PaletteNames).map((palette) => {
      const paletteLowerCase = palette.toLowerCase();
      return html`<option
          value="${paletteLowerCase}"
          ?selected=${this.selectedPalette === paletteLowerCase}
          >${paletteLowerCase}</option
        >`;
    })}
    `;

    const header = showTitle ? html`
          <div id="input-header">
            <p id="input-label">Palette</p>
          </div>
        ` :
                               nothing;

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
