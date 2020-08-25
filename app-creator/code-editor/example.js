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
var app = deserializer.createApp(
    '{"id":"left-side-panel","name":"Left Side Panel","panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-1","label-0","button-0","chart-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"aubergine","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"chart-0":{"id":"chart-0","children":[],"uniqueAttributes":{"dataTable":"","chartType":"ScatterChart","title":"","color":"[\\"\\"]","3D":"false","downloadable":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"black","backgroundColor":"#FFFFFF00","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-0":{"id":"label-0","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\\"s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"black","backgroundColor":"#FFFFFF00","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\\"s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"black","backgroundColor":"#FFFFFF00","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"black","backgroundColor":"#FFFFFF00","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}');

/**
 * Draw app to screen.
 */
app.draw();
