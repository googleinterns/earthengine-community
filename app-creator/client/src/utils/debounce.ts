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
 * @fileoverview A simple debouncer implementation.
 */

/**
 * This function debounces an external function with the specified delay time.
 * @param context context of calling object.
 * @param fn function that requires debouncing.
 * @param delay waiting time between consecutive events.
 */
export function debounce<Params extends any[]>(
    context: any, fn: (...params: {target: HTMLInputElement}[]) => any,
    delay: number) {
  let timer: NodeJS.Timeout;
  return function(...args: Params) {
    clearTimeout(timer);
    const target = args[0].target;
    timer = setTimeout(() => {
      fn.apply(context, [{target}]);
    }, delay);
  };
}
