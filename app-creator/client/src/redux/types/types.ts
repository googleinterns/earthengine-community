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
 * @fileoverview Defines the EEWidget type.
 */

import {Button} from '../../widgets/ui-button/ui-button';
import {Chart} from '../../widgets/ui-chart/ui-chart';
import {Checkbox} from '../../widgets/ui-checkbox/ui-checkbox';
import {Label} from '../../widgets/ui-label/ui-label';
import {Map} from '../../widgets/ui-map/ui-map';
import {Panel} from '../../widgets/ui-panel/ui-panel';
import {Select} from '../../widgets/ui-select/ui-select';
import {SideMenu} from '../../widgets/ui-sidemenu/ui-sidemenu';
import {Slider} from '../../widgets/ui-slider/ui-slider';
import {Textbox} from '../../widgets/ui-textbox/ui-textbox';

export type EEWidget =
    |Panel|Map|Label|Button|Slider|Select|Textbox|Checkbox|Chart|SideMenu;
