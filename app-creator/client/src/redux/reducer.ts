/**
 *  @fileoverview This file contains the main reducer function that our store
 *  uses to resolve dispatched actions.
 */
import {
  SET_DRAGGING_WIDGET,
  SET_EDITING_WIDGET,
  SET_ELEMENT_ADDED,
  INCREMENT_WIDGET_ID,
  RESET_DRAGGING_VALUES,
  SET_SELECTED_TAB,
  SET_REORDERING,
  AppCreatorAction,
  ADD_WIDGET_META_DATA,
  REMOVE_WIDGET,
  UPDATE_WIDGET_META_DATA,
  SET_SELECTED_TEMPLATE,
  UPDATE_WIDGET_CHILDREN,
  SET_SELECTED_TEMPLATE_ID,
  SET_PALETTE,
  SET_EVENT_TYPE,
  RemoveWidget,
<<<<<<< HEAD
  UPDATE_WIDGET_IDS,
=======
>>>>>>> added tests for redux helpers
} from './types/actions';
import { Reducer, AnyAction } from 'redux';
import { UniqueAttributes } from './types/attributes';
import { EventType, Tab, PaletteNames } from './types/enums';
import { deepCloneTemplate } from '../utils/helpers';
import {
  Palette,
  PalettePicker,
} from '../widgets/palette-picker/palette-picker';
import {
  applyPalette,
  updateWidgetAttribute,
  getBackgroundColor,
  updateUniqueAttributesInDOM,
  removeWidgetHelper,
  addDefaultStyles,
} from './helpers';

export interface WidgetMetaData {
  id: string;
  editable?: boolean;
  widgetRef?: HTMLElement;
  children: string[];
  uniqueAttributes: UniqueAttributes;
  style: { [key: string]: string };
}

export interface AppCreatorStore {
  editingElement: Element | null;
  draggingElement: Element | null;
  selectedTemplateID: string;
  selectedPalette: Palette;
  selectedTab: Tab;
  eventType: EventType;
  widgetIDs: { [key: string]: number };
  template: { [key: string]: any };
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
export const reducer: Reducer<AppCreatorStore, AppCreatorAction | AnyAction> = (
  state = INITIAL_STATE,
  action
): AppCreatorStore => {
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
        selectedTab: action.payload.openAttributesTab
          ? Tab.ATTRIBUTES
          : state.selectedTab,
      };
    case SET_PALETTE:
      const templateWithPalette = deepCloneTemplate(state.template, false);

      /**
       * We want to restyle the current template, so we make a wipe over all widgets
       * and update the color, backgroundColor, and map styling properties.
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
        eventType: action.payload.value ? EventType.REORDERING : EventType.NONE,
      };
    case SET_SELECTED_TEMPLATE_ID:
      return {
        ...state,
        selectedTemplateID: action.payload.id,
      };
    case SET_EVENT_TYPE:
      return {
        ...state,
        eventType: action.payload.value
          ? action.payload.eventType
          : EventType.NONE,
      };
    case ADD_WIDGET_META_DATA:
      const widgetWithPalette = Object.assign({}, action.payload);

      /**
       * When we add widgets for the first time into the DOM, we want
       * to apply the correct styling so it matches the currently selected palette.
       * For example, if we have a dark palette, we want to add text with a white color,
       * while for a light palette, we want to add text with a black color.
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
      const { id } = action.payload;

      // Set the widget's backgroundColor style property with the appropriate value
      // (i.e. #FFFFFF00) with the appropriate opacity.
      templateToBeUpdated.widgets[
        id
      ].style.backgroundColor = getBackgroundColor(
        templateToBeUpdated.widgets[id].style
      );

      // Get widgetRef from template and set styles to the DOM element. This step
      // is necessary to have the changes reflected in the UI.
      const { widgetRef } = templateToBeUpdated.widgets[id];

      // Update the css styling on the element.
      widgetRef.setStyle(templateToBeUpdated.widgets[id].style);

      // Update unique attributes (i.e. label, disabled, mapstyles, etc...).
      updateUniqueAttributesInDOM(widgetRef, templateToBeUpdated);

      return {
        ...state,
        template: templateToBeUpdated,
      };
    case REMOVE_WIDGET:
      // Create template copy.
      const templateBeforeRemoval = deepCloneTemplate(state.template, false);

      // Get payload properties.
      const {
        reordering,
        id: widgetToRemoveId,
      }: RemoveWidget['payload'] = action.payload;

      // Remove widget from template and filter corresponding children.
      removeWidgetHelper(templateBeforeRemoval, reordering, widgetToRemoveId);

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
      // the template JSON string might not declare all the required style properties.
      addDefaultStyles(action.payload.template);

      // Apply palette properties (i.e. backgroundColor, color, and map styles) to the template.
      applyPalette(action.payload.template.widgets, state.selectedPalette.name);

      return {
        ...INITIAL_STATE,
        widgetIDs:
          state.eventType === EventType.CHANGINGPALETTE
            ? state.widgetIDs
            : INITIAL_STATE.widgetIDs,
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
