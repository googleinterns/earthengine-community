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
 * @fileoverview This file contains the main reducer function that our store
 * uses to resolve dispatched actions.
 */

import {Reducer} from 'redux';

import {deepCloneTemplate} from '../utils/helpers';
import {Palette, PalettePicker,} from '../widgets/palette-picker/palette-picker';

import {addDefaultStyles, applyPalette, getBackgroundColor, removeWidgetHelper, updateUniqueAttributesInDOM, updateWidgetAttribute,} from './helpers';
import {ADD_WIDGET_META_DATA, AppCreatorAction, INCREMENT_WIDGET_ID, REMOVE_WIDGET, RemoveWidget, RESET_DRAGGING_VALUES, SET_DRAGGING_WIDGET, SET_EDITING_WIDGET, SET_ELEMENT_ADDED, SET_EVENT_TYPE, SET_PALETTE, SET_REORDERING, SET_SELECTED_TAB, SET_SELECTED_TEMPLATE, SET_SELECTED_TEMPLATE_ID, UPDATE_WIDGET_CHILDREN, UPDATE_WIDGET_IDS, UPDATE_WIDGET_META_DATA, UPDATE_WIDGET_SHARED_STATUS,} from './types/actions';
import {UniqueAttributes} from './types/attributes';
import {EventType, PaletteNames, Tab} from './types/enums';

export interface WidgetMetaData {
  id: string;
  editable?: boolean;
  shared?: boolean;
  widgetRef?: HTMLElement;
  children: string[];
  uniqueAttributes: UniqueAttributes;
  style: {[key: string]: string};
}

export interface AppCreatorStore {
  editingElement: Element|null;
  draggingElement: Element|null;
  selectedTemplateID: string;
  selectedPalette: Palette;
  selectedTab: Tab;
  eventType: EventType;
  widgetIDs: {[key: string]: number};
  template: {[key: string]: any};
}

/**
 * Initial state of our application.
 */
const INITIAL_STATE: AppCreatorStore = {
  editingElement: null,
  draggingElement: null,
  selectedTab: Tab.WIDGETS,
  selectedTemplateID: '',
  selectedPalette: PalettePicker.palette[PaletteNames.LIGHT],
  eventType: EventType.NONE,
  widgetIDs: {
    label: 0,
    button: 0,
    select: 0,
    textbox: 0,
    panel: 0,
    slider: 0,
    checkbox: 0,
    chart: 0,
    map: 0,
  },
  template: {},
};

/**
 * Resolves dispatched actions by returning a new state object
 * with the necessary modifications.
 * @param state current state of our application.
 * @param action action to be resolved.
 */
export const reducer: Reducer<AppCreatorStore, AppCreatorAction> =
    (state = INITIAL_STATE, action): AppCreatorStore => {
      switch (action.type) {
        case SET_DRAGGING_WIDGET:
          return {
            ...state,
            ...action.payload,
          };
        case SET_EDITING_WIDGET:
          return {
            ...state,
            editingElement: action.payload.editingElement,
            eventType: action.payload.eventType,
            selectedTab: action.payload.openAttributesTab ? Tab.ATTRIBUTES :
                                                            state.selectedTab,
          };
        case SET_PALETTE:
          const templateWithPalette = deepCloneTemplate(state.template, false);

          /**
           * We want to restyle the current template, so we make a wipe over all
           * widgets and update the color, backgroundColor, and map styling
           * properties.
           */
          applyPalette(templateWithPalette.widgets, action.payload.palette);

          return {
            ...state,
            selectedPalette:
                PalettePicker.palette[action.payload.palette as PaletteNames],
            template: templateWithPalette,
          };
        case SET_SELECTED_TAB:
          return {
            ...state,
            ...action.payload,
          };
        case SET_ELEMENT_ADDED:
          return {
            ...state,
            eventType: action.payload.value ? EventType.ADDING : EventType.NONE,
          };
        case SET_REORDERING:
          return {
            ...state,
            eventType: action.payload.value ? EventType.REORDERING :
                                              EventType.NONE,
          };
        case SET_SELECTED_TEMPLATE_ID:
          return {
            ...state,
            selectedTemplateID: action.payload.id,
          };
        case SET_EVENT_TYPE:
          return {
            ...state,
            eventType: action.payload.value ? action.payload.eventType :
                                              EventType.NONE,
          };
        case ADD_WIDGET_META_DATA:
          const widgetWithPalette = Object.assign({}, action.payload);
          /**
           * When we add widgets for the first time into the DOM, we want
           * to apply the correct styling so it matches the currently selected
           * palette. For example, if we have a dark palette, we want to add
           * text with a white color, while for a light palette, we want to add
           * text with a black color.
           */
          applyPalette(widgetWithPalette, state.selectedPalette.name);

          return {
            ...state,
            template: {
              ...state.template,
              widgets: {
                ...state.template.widgets,
                ...widgetWithPalette,
              },
            },
          };
        case UPDATE_WIDGET_META_DATA:
          const templateToBeUpdated = deepCloneTemplate(state.template, false);

          // Update widget attribute with the new value.
          updateWidgetAttribute(templateToBeUpdated, action.payload);

          // Get widget id from payload.
          const {id} = action.payload;

          // Set the widget's backgroundColor style property with the
          // appropriate value (i.e. #ffffff00) with the appropriate opacity.
          templateToBeUpdated.widgets[id].style.backgroundColor =
              getBackgroundColor(templateToBeUpdated.widgets[id].style);

          // Get widgetRef from template and set styles to the DOM element. This
          // step is necessary to have the changes reflected in the UI.
          const {widgetRef} = templateToBeUpdated.widgets[id];

          // Update the css styling on the element.
          const widgetStyle =
              Object.assign({}, templateToBeUpdated.widgets[id].style);

          /**
           * For widgets that are on the scratch panel and have a white color,
           * and their background color is either white or transparent, we
           * keep the background color from the selected palette.
           */
          if (templateToBeUpdated.widgets[id].shared &&
              widgetStyle.color.startsWith('#ffffff') &&
              (widgetStyle.backgroundColor.startsWith('#ffffff') ||
               (widgetStyle.backgroundColor.length === 9 &&
                widgetStyle.backgroundColor.endsWith('00')))) {
            widgetStyle.backgroundColor = state.selectedPalette.backgroundColor;
            widgetStyle.padding = '8px';
            widgetStyle.borderRadius = '8px';
          }

          widgetRef.setStyle(widgetStyle);

          // Update unique attributes (i.e. label, disabled, mapstyles, etc...).
          updateUniqueAttributesInDOM(widgetRef, templateToBeUpdated);

          return {
            ...state,
            template: templateToBeUpdated,
          };
        case UPDATE_WIDGET_SHARED_STATUS:
          const templateWithUpdatedStatus =
              deepCloneTemplate(state.template, false);
          templateWithUpdatedStatus.widgets[action.payload.id].shared =
              action.payload.isShared;

          return {
            ...state,
            template: templateWithUpdatedStatus,
          };
        case REMOVE_WIDGET:
          // Create template copy.
          const templateBeforeRemoval =
              deepCloneTemplate(state.template, false);

          // Get payload properties.
          const {
            reordering,
            id: widgetToRemoveId,
          }: RemoveWidget['payload'] = action.payload;

          // Remove widget from template and filter corresponding children.
          removeWidgetHelper(
              templateBeforeRemoval, reordering, widgetToRemoveId);

          return {
            ...state,
            template: templateBeforeRemoval,
          };
        case INCREMENT_WIDGET_ID:
          return {
            ...state,
            widgetIDs: {
              ...state.widgetIDs,
              [action.payload.id]: state.widgetIDs[action.payload.id] + 1,
            },
          };
        case UPDATE_WIDGET_IDS:
          return {
            ...state,
            widgetIDs: {
              ...state.widgetIDs,
              ...action.payload.updatedIDs,
            },
          };
        case SET_SELECTED_TEMPLATE:
          // Apply default styles to the template, this is necessary because
          // the template JSON string might not declare all the required style
          // properties.
          addDefaultStyles(action.payload.template);

          // Apply palette properties (i.e. backgroundColor, color, and map
          // styles) to the template.
          applyPalette(
              action.payload.template.widgets, state.selectedPalette.name);

          return {
            ...INITIAL_STATE,
            widgetIDs: state.eventType === EventType.CHANGINGPALETTE ?
                state.widgetIDs :
                INITIAL_STATE.widgetIDs,
            selectedPalette: state.selectedPalette,
            selectedTemplateID: state.selectedTemplateID,
            selectedTab: state.selectedTab,
            template: action.payload.template,
          };
        case RESET_DRAGGING_VALUES:
          return {
            ...state,
            ...action.payload,
          };
        case UPDATE_WIDGET_CHILDREN:
          return {
            ...state,
            template: {
              ...state.template,
              widgets: {
                ...state.template.widgets,
                [action.payload.id]: {
                  ...state.template.widgets[action.payload.id],
                  children: action.payload.childrenIDs,
                },
              },
            },
          };
        default:
          return state;
      }
    };
