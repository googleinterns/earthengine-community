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
 * @fileoverview Enums that are commonly used across the App Creator.
 */

export enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  COLOR = 'color',
  SELECT = 'select',
}

export enum WidgetType {
  LABEL = 'label',
  BUTTON = 'button',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  SLIDER = 'slider',
  TEXTBOX = 'textbox',
  PANEL = 'panel',
  MAP = 'map',
  CHART = 'chart',
  SIDEMENU = 'sidemenu',
}

/**
 * Adds background color to an element. Used when adding elements to the scratch
 * panel.
 */
export enum WidgetsRequiringBackground {
  LABEL = WidgetType.LABEL,
  CHECKBOX = WidgetType.CHECKBOX,
  SLIDER = WidgetType.SLIDER,
}

export enum Tab {
  TEMPLATES = 0,
  WIDGETS = 1,
  ATTRIBUTES = 2,
}

export enum AttributeType {
  UNIQUE = 'uniqueAttributes',
  STYLE = 'style',
}

export enum EventType {
  EDITING = 'editing',
  REORDERING = 'reordering',
  ADDING = 'adding',
  CHANGINGPALETTE = 'changingPalette',
  CHANGINGTEMPLATE = 'changingTemplate',
  SHAREDWIDGETS = 'sharedWidgets',
  NONE = 'none',
}

export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  ALL = 'all',
}

export enum Layout {
  COLUMN = 'column',
  ROW = 'row',
}

export enum PaletteNames {
  LIGHT = 'light',
  DARK = 'dark',
  NIGHT = 'night',
  RETRO = 'retro',
  SILVER = 'silver',
  AUBERGINE = 'aubergine',
}
