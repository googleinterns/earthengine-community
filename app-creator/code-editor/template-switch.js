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

var deserializer =
    require('users/msibrahim/app-creator:app-creator-deserializer');

/**
 * Create an app instance.
 */
var englishDesktopLight = deserializer.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"left-side-panel-desktop","name":"Left Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-4","label-5","button-2"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-4":{"id":"label-4","children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-5":{"id":"label-5","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-2":{"id":"button-2","children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

var englishDesktopDark = deserializer.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"left-side-panel-desktop","name":"Left Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-4","label-5","button-2"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-4":{"id":"label-4","children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-5":{"id":"label-5","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-2":{"id":"button-2","children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');
var arabicDesktopLight = deserializer.createApp(
    '{"config":{"parentID":"right-side-panel","parentName":"Right Side Panel","id":"right-side-panel-desktop","name":"Right Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0","panel-template-1"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-9","label-8","button-4"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#FFFFFFFF","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"button-4":{"id":"button-4","children":[],"uniqueAttributes":{"label":"اكتشف","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-8":{"id":"label-8","children":[],"uniqueAttributes":{"value":"يجمع محرك الأرض بين كتالوج متعدد البيتابايت لصور الأقمار الصناعية ومجموعات البيانات الجغرافية المكانية مع إمكانات التحليل على مستوى الكواكب ويجعله متاحًا للعلماء والباحثين والمطورين لاكتشاف التغييرات وتحديد الاتجاهات وتحديد الاختلافات على سطح الأرض","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"label-9":{"id":"label-9","children":[],"uniqueAttributes":{"value":"محرك الأرض","targetUrl":""},"style":{"height":"px","width":"97%","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}}}}');

var arabicDesktopDark = deserializer.createApp(
    '{"config":{"parentID":"right-side-panel","parentName":"Right Side Panel","id":"right-side-panel-desktop","name":"Right Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0","panel-template-1"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-9","label-8","button-4"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#FFFFFFff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"button-4":{"id":"button-4","children":[],"uniqueAttributes":{"label":"اكتشف","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-8":{"id":"label-8","children":[],"uniqueAttributes":{"value":"يجمع محرك الأرض بين كتالوج متعدد البيتابايت لصور الأقمار الصناعية ومجموعات البيانات الجغرافية المكانية مع إمكانات التحليل على مستوى الكواكب ويجعله متاحًا للعلماء والباحثين والمطورين لاكتشاف التغييرات وتحديد الاتجاهات وتحديد الاختلافات على سطح الأرض","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"label-9":{"id":"label-9","children":[],"uniqueAttributes":{"value":"محرك الأرض","targetUrl":""},"style":{"height":"px","width":"97%","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}}}}');

var englishMobileLight = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-3","label-2","button-1"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-2":{"id":"label-2","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-1":{"id":"button-1","children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-3":{"id":"label-3","children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

var englishMobileDark = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-3","label-2","button-1"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-2":{"id":"label-2","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-1":{"id":"button-1","children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-3":{"id":"label-3","children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');
var arabicMobileDark = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-7","label-6","button-3"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-6":{"id":"label-6","children":[],"uniqueAttributes":{"value":"يجمع محرك الأرض بين كتالوج متعدد البيتابايت لصور الأقمار الصناعية ومجموعات البيانات الجغرافية المكانية مع إمكانات التحليل على مستوى الكواكب ويجعله متاحًا للعلماء والباحثين والمطورين لاكتشاف التغييرات وتحديد الاتجاهات وتحديد الاختلافات على سطح الأرض","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"label-7":{"id":"label-7","children":[],"uniqueAttributes":{"value":"محرك الأرض","targetUrl":""},"style":{"height":"px","width":"97%","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"button-3":{"id":"button-3","children":[],"uniqueAttributes":{"label":"اكتشف","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}}}}');

var arabicMobileLight = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-7","label-6","button-3"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-6":{"id":"label-6","children":[],"uniqueAttributes":{"value":"يجمع محرك الأرض بين كتالوج متعدد البيتابايت لصور الأقمار الصناعية ومجموعات البيانات الجغرافية المكانية مع إمكانات التحليل على مستوى الكواكب ويجعله متاحًا للعلماء والباحثين والمطورين لاكتشاف التغييرات وتحديد الاتجاهات وتحديد الاختلافات على سطح الأرض","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"label-7":{"id":"label-7","children":[],"uniqueAttributes":{"value":"محرك الأرض","targetUrl":""},"style":{"height":"px","width":"97%","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}},"button-3":{"id":"button-3","children":[],"uniqueAttributes":{"label":"اكتشف","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"right","whiteSpace":"normal","shown":"true"}}}}');

var spanishDesktopLight = deserializer.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"left-side-panel-desktop","name":"Left Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-4","label-5","button-2"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-4":{"id":"label-4","children":[],"uniqueAttributes":{"value":"El motor de la tierra","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-5":{"id":"label-5","children":[],"uniqueAttributes":{"value":"Google Earth Engine combina un catálogo de varios petabytes de imágenes satelitales y conjuntos de datos geoespaciales con capacidades de análisis a escala planetaria y lo pone a disposición de científicos, investigadores y desarrolladores para detectar cambios, mapear tendencias y cuantificar diferencias en la superficie de la Tierra.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-2":{"id":"button-2","children":[],"uniqueAttributes":{"label":"explorar","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

var spanishDesktopDark = deserializer.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"left-side-panel-desktop","name":"Left Side Panel Desktop","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-4","label-5","button-2"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-4":{"id":"label-4","children":[],"uniqueAttributes":{"value":"El motor de la tierra","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-5":{"id":"label-5","children":[],"uniqueAttributes":{"value":"Google Earth Engine combina un catálogo de varios petabytes de imágenes satelitales y conjuntos de datos geoespaciales con capacidades de análisis a escala planetaria y lo pone a disposición de científicos, investigadores y desarrolladores para detectar cambios, mapear tendencias y cuantificar diferencias en la superficie de la Tierra.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-2":{"id":"button-2","children":[],"uniqueAttributes":{"label":"explorar","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

var spanishMobileDark = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-7","label-6","button-3"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-6":{"id":"label-6","children":[],"uniqueAttributes":{"value":"Google Earth Engine combina un catálogo de varios petabytes de imágenes satelitales y conjuntos de datos geoespaciales con capacidades de análisis a escala planetaria y lo pone a disposición de científicos, investigadores y desarrolladores para detectar cambios, mapear tendencias y cuantificar diferencias en la superficie de la Tierra.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-7":{"id":"label-7","children":[],"uniqueAttributes":{"value":"El motor de la tierra","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-3":{"id":"button-3","children":[],"uniqueAttributes":{"label":"explorar","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#0e1626","backgroundColor":"#ffffffff","backgroundOpacity":"100","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

var spanishMobileLight = deserializer.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-7","label-6","button-3"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-6":{"id":"label-6","children":[],"uniqueAttributes":{"value":"Google Earth Engine combina un catálogo de varios petabytes de imágenes satelitales y conjuntos de datos geoespaciales con capacidades de análisis a escala planetaria y lo pone a disposición de científicos, investigadores y desarrolladores para detectar cambios, mapear tendencias y cuantificar diferencias en la superficie de la Tierra.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-7":{"id":"label-7","children":[],"uniqueAttributes":{"value":"El motor de la tierra","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"32px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-3":{"id":"button-3","children":[],"uniqueAttributes":{"label":"explorar","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"black","fontSize":"12px","color":"#000000","backgroundColor":"#000000ff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

// The function that configures different devices according to screen sizes.
var templates = {
  selectedDevice: 'desktop',
  selectedTheme: 'light',
  selectedLanguage: 'english',
  languages: ['english', 'spanish', 'arabic'],
  themes: ['light', 'dark'],
  devices: ['desktop', 'mobile'],
  desktop: {
    light: {
      spanish: spanishDesktopLight,
      arabic: arabicDesktopLight,
      english: englishDesktopLight
    },
    dark: {
      spanish: spanishDesktopDark,
      english: englishDesktopDark,
      arabic: arabicDesktopDark
    }
  },
  mobile: {
    light: {
      spanish: spanishMobileLight,
      english: englishMobileLight,
      arabic: arabicMobileLight
    },
    dark: {
      spanish: spanishMobileDark,
      english: englishMobileDark,
      arabic: arabicMobileDark
    }
  }

};

drawStatefulApp(templates);

/**
 * Creates a stateful UI given a templates object containing different template
 * variations.
 */
function drawStatefulApp(templates) {
  if (Object.keys(templates).length === 1) {
    // We only have a default template.
    ui.root.clear();
    ui.root.add(templates.default.root);
    return;
  }

  /**
   * Returns an app container containing a toolbar (optional).
   */
  function getScaffold() {
    var toolbar = getToolbar();

    return ui.Panel({
      widgets: toolbar === null ? [] : [toolbar, createBottomBorder()],
      style: {width: '100%', height: '100%'}
    });
  }

  /**
   * Returns panel that acts as a bottom border for the toolbar.
   */
  function createBottomBorder() {
    var isDark = templates.selectedTheme === 'dark';
    return ui.Panel({
      style: {height: '1px', backgroundColor: isDark ? '#ffffff' : '#000000'}
    });
  }

  /**
   * Returns app toolbar containing select menus.
   */
  function getToolbar() {
    var languageSelect = getLanguageSelect();
    var themeSelect = getThemeSelect();

    if (languageSelect === null && themeSelect === null) {
      return null;
    }

    var widgetsArray = [makeSpacer('horizontal')];

    if (languageSelect !== null) {
      widgetsArray.push(languageSelect);
    }

    if (themeSelect !== null) {
      widgetsArray.push(themeSelect);
    }

    return ui.Panel({
      widgets: widgetsArray,
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {
        width: '100%',
        height: '45px',
        backgroundColor:
            templates[templates.selectedDevice][templates.selectedTheme]
                     [templates.selectedLanguage]
                         .root.style()
                         .get('backgroundColor')
      }
    });
  }

  /**
   * Returns drop down menu of supported languages.
   */
  function getLanguageSelect() {
    if (templates.languages && templates.languages.length > 1) {
      return ui.Select({
        items: templates.languages,
        value: templates.selectedLanguage,
        placeholder: ['Language'],
        onChange: handleLanguageSelect
      });
    } else {
      // Return empty panel if the languages array doesn't exist or if there is
      // only one language.
      return null;
    }
  }

  /**
   * Callback triggered on language selection.
   */
  function handleLanguageSelect(value) {
    templates.selectedLanguage = value;
    renderScaffold();
  }

  /**
   * Returns drop down menu of supported themes.
   */
  function getThemeSelect() {
    if (templates.themes && templates.themes.length > 1) {
      return ui.Select({
        items: templates.themes,
        value: templates.selectedTheme,
        placeholder: ['Theme'],
        onChange: handleThemeSelect,
      });
    } else {
      // Return empty panel if the themes array doesn't exist or if there is
      // only one theme.
      return null;
    }
  }

  /**
   * Callback triggered on theme selection.
   */
  function handleThemeSelect(value) {
    templates.selectedTheme = value;
    renderScaffold();
  }

  /**
   * Renders new template. Called on handle theme select and handle language
   * select callbacks.
   */
  function renderScaffold() {
    scaffold.clear();
    scaffold = getScaffold();
    scaffold.widgets().add(
        templates[templates.selectedDevice][templates.selectedTheme]
                 [templates.selectedLanguage]
                     .root);
    ui.root.widgets().reset([scaffold]);
  }

  /**
   * Creates a spacer for the given direction ('horizontal', 'vertical').
   */
  function makeSpacer(direction) {
    return ui.Label({
      value: ' ',
      style: {
        margin: 0,
        padding: 0,
        stretch: direction,
      }
    });
  }

  /**
   * Callback triggered on 'onResize' events. renders appropriate template besed
   * on device width.
   */
  function configLayout(deviceInfo) {
    scaffold.clear();
    scaffold = getScaffold();
    if (templates.hasOwnProperty('mobile') && !deviceInfo.is_desktop ||
        deviceInfo.width < 900) {
      templates.selectedDevice = 'mobile';
      scaffold.widgets().add(
          templates.mobile[templates.selectedTheme][templates.selectedLanguage]
              .root);
    } else {
      templates.selectedDevice = 'desktop';
      scaffold.widgets().add(
          templates.desktop[templates.selectedTheme][templates.selectedLanguage]
              .root);
    }
    ui.root.widgets().reset([scaffold]);
  }

  var scaffold = getScaffold();
  ui.root.onResize(configLayout);
}

exports.drawStatefulApp = drawStatefulApp;
