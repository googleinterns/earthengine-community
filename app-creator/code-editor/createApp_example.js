var AppCreator =
    require('users/msibrahim/app-creator:app-creator-deserializer');

/**
 * AppCreator.createApp provides an API for building a single app instance from
 * the app creator (https://ee-app-creator.appspot.com/). This method takes in a
 * template string exported from the website and renders the corresponding earth
 * engine widgets on the code editor. As an example, a label widget from the app
 * creator will be converted into a ui.Label() widget on the code editor. A
 * widget interface is provided by the API to access the corresponding UI
 * elements.
 * -----------------------------------------------------------------------------------------------
 *
 * In the following example we're going to look at how to build an app instance
 * and access the corresponding UI elements.
 */

/**
 * 1. Create app instance by pasting the template string provided by the app
 * creator.
 */
var app = AppCreator.createApp(
    '{"config":{"parentID":"left-side-panel","parentName":"Left Side Panel","id":"yzdztx2sbt9710dgmhj9pluwgpz5c0h5","name":"createApp_example","device":"desktop"},"widgets":{"panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#dfd2ae","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":["label-0","label-1","button-0"],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"16px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#e28b59","fontSize":"12px","color":"#000000","backgroundColor":"#dfd2aeff","backgroundOpacity":"100","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"10","latitude":"37.419857","longitude":"-122.078827","zoomControl":"false","fullscreenControl":"false","scaleControl":"false","streetViewControl":"false","mapTypeControl":"false","mapStyles":"retro","customMapStyles":""},"style":{"height":"100%","width":"60%","padding":"0px","margin":"0px","borderWidth":"0px","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","color":"#000000","backgroundColor":"#ffffff","backgroundOpacity":"0","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","boxSizing":"border-box"}},"label-0":{"id":"label-0","shared":false,"children":[],"uniqueAttributes":{"value":"Earth Engine","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"32px","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"label-1":{"id":"label-1","shared":false,"children":[],"uniqueAttributes":{"value":"Google Earth Engine combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth\'s surface.","targetUrl":""},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#000000","backgroundColor":"#ffffff00","backgroundOpacity":"0","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"14px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"button-0":{"id":"button-0","shared":false,"children":[],"uniqueAttributes":{"label":"Button","disabled":"false"},"style":{"height":"px","width":"px","padding":"0px","margin":"8px","color":"#000000","backgroundColor":"#ffffffff","backgroundOpacity":"100","borderWidth":"0","borderStyle":"solid","borderColor":"#000000","fontSize":"12px","fontWeight":"700","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}}}}');

/**
 * 2. At this point, we can directly access the widgets by calling
 * app.widgets(). This will return an ActiveDictionary of all the corresponding
 * widgets. Using this interface, we can bind actions to any of the underlying
 * elements. Lets bind an action to the button with id 'button-0'.
 */
app.widgets().get('button-0').onClick(function() {
  print('Button clicked!');
});

/**
 * To view the different widgets available, Lets print the widgets interface to
 * the console like so.
 */
print(app.widgets());

/**
 * 3. Render app.
 */
app.draw();
