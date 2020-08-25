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
 */

var AppCreator =
    require('users/msibrahim/app-creator:app-creator-deserializer');

/**
 * AppCreator.createMultiSelectorApp provides an API for building switchable
 * templates. This could be for switching between languages, themes, or app
 * content. In the following example we are going to look at creating a
 * multi-lingual app.
 * -----------------------------------------------------------------------------------------------
 *
 * The API takes in an optional object on construction.
 * The object's keys are used as items on a ui.Select element.
 * Each key points to an app instance created by either AppCreator.createApp or
 * AppCreator.createResponsiveApp. This enables users to build switchable apps
 * with responsive features.
 *
 * If an initial object is not passed in, calling the set method can be used to
 * add individual templates like so: multiSelectorApp.add(key, app). Note that
 * if the key already exists in the app, this method will overwrite it.
 *
 * In this example, we're going to look at how to build a multi-lingual app in
 * English and Spanish. This approach can also be applied to building
 * multi-themed apps (i.e. apps with light and dark modes), and apps with
 * dynamic content.
 */

/**
 * 1. Create two app instances (one for English and one for Spanish).
 */
var english = AppCreator.createApp(
    '{"config":{"parentID":"map-with-legend","parentName":"Map with legend","id":"map-with-legend-desktop","device":"desktop","name":"Map with legend Desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"relative","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"35%","width":"400px","padding":"16px","margin":"0px","borderWidth":"5px","borderStyle":"solid","borderColor":"#85b7b0","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"absolute","bottom":"32px","left":"16px","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":["panel-template-1"],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"aubergine","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');
var spanish = AppCreator.createApp(
    '{"config":{"parentID":"map-with-legend","parentName":"Map with legend","id":"82twzffumqttbn6szf3h6i5m9a43jq8j","device":"desktop","name":"s"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"relative","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"35%","width":"400px","padding":"16px","margin":"0px","borderWidth":"5px","borderStyle":"solid","borderColor":"#85b7b0","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"absolute","bottom":"32px","left":"16px","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":["panel-template-1"],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"aubergine","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"El Motor de la Tierra","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"Google Earth Engine combina un catálogo de varios petabytes de imágenes satelitales y conjuntos de datos geoespaciales con capacidades de análisis a escala planetaria y lo pone a disposición de científicos, investigadores y desarrolladores para detectar cambios, mapear tendencias y cuantificar diferencias en la superficie de la Tierra.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"Botón","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffffff","backgroundOpacity":"100","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

/**
 * 2. Create a multiSelectorApp by passing in the the two apps created
 * previously.
 */
var multiSelectorApp = AppCreator.createMultiSelectorApp({
  English: english,
  Spanish: spanish,
});

/**
 * 2a. To add an app instance separately, we can do so by using the set method.
 * Lets look at how we can add an arabic version to the existing app.
 */
var arabic = AppCreator.createApp(
    '{"config":{"parentID":"map-with-legend","parentName":"Map with legend","id":"589ce5m2vn040wtx198p4gi31kvzsu3q","device":"desktop","name":"s"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"relative","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"35%","width":"400px","padding":"16px","margin":"0px","borderWidth":"5px","borderStyle":"solid","borderColor":"#85b7b0","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"absolute","bottom":"32px","left":"16px","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":["panel-template-1"],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"aubergine","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"محرك الأرض","targetUrl":""},"style":{"height":"px","width":"98%","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"يجمع محرك الأرض بين كتالوج متعدد بيتابايت من صور الأقمار الصناعية ومجموعات البيانات الجغرافية المكانية مع إمكانات التحليل على نطاق الكواكب ويجعلها متاحة للعلماء والباحثين والمطورين لاكتشاف التغييرات واتجاهات الخرائط وتحديد الاختلافات على سطح الأرض","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"اضغط","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffffff","backgroundOpacity":"100","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

multiSelectorApp.set('Arabic', arabic);

/**
 * 3. Render app.
 */
multiSelectorApp.draw();
