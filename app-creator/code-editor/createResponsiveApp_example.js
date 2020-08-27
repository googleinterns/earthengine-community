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
 * AppCreator.createResponsiveApp provides an API for building responsive
 * templates. This could be used for building apps that dynamically resize to
 * fit the window.
 * -----------------------------------------------------------------------------------------------
 *
 * The createResponsiveApp method takes in an object with two keys: desktop and
 * mobile. Each key points to an app instance created by AppCreator.createApp.
 * The following example will walk through building a responsive app using this
 * API.
 */

/**
 * 1. Create two app instances (one for desktop and one for mobile).
 */
var desktop = AppCreator.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"yzdztx2sbt9710dgmhj9pluwgpz5c0h5","name":"egypt_classification","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');
var mobile = AppCreator.createApp(
    '{"config":{"parentID":"left-drawer-mobile","parentName":"Left Drawer Mobile","id":"left-drawer-mobile","name":"Left Side Panel Mobile","device":"mobile"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["sidemenu-template-0","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"relative"}},"sidemenu-template-0":{"id":"sidemenu-template-0","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"80%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#0e1626","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box","position":"absolute","top":0,"left":0,"zIndex":10}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"silver","customMapStyles":""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"black","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","box-sizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","color":"#ffffff","backgroundColor":"#ffffff00","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#0e1626","backgroundColor":"#ffffff","backgroundOpacity":"100","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

/**
 * 2. Binding actions to our app instances. We can view the list of widgets
 * available by printing the widgets interface for each app like so.
 *
 * print(desktop.widgets())
 * print(mobile.widgets())
 *
 * We can then bind our actions by specifying a particular widget by its id. In
 * the following example, we are going to look at how we can bind an onClick
 * handler on each of our buttons.
 */

// 2a. Create callback handler.
function buttonClick() {
  print('Button clicked!');
}

// 2b. Bind callback to each button.
desktop.widgets().get('button-0').onClick(buttonClick);
mobile.widgets().get('button-0').onClick(buttonClick);

/**
 * 3. Create a responsive app instance passing in the two templates created on
 * step one.
 */
var responsiveApp = AppCreator.createResponsiveApp({
  desktop: desktop,
  mobile: mobile,
});

/**
 * 4. Render app.
 */
responsiveApp.draw();
