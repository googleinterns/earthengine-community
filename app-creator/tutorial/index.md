<!--
---
title: Getting started with the Earth Engine App Creator
description: This tutorial is an introduction to the Earth Engine App Creator. A code-free UI editor that lets users build rich and beautiful Earth Engine Apps with ease.
author: mibrah42
tags: earth-engine, app-creator, front-end, apps, javascript 
date_published: 2020-09-01
---
-->
<!--
Copyright 2019 The Google Earth Engine Community Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## Introduction

This tutorial is an introduction to the Earth Engine App Creator. A code-free UI editor that lets users build rich and beautiful Earth Engine Apps with ease. The App Creator was developed to help users quickly build user interfaces for their apps without needing to write any code. Apps developed using the App Creator can be imported into the code editor for further development (i.e. Binding actions, Loading datasets, Adding map layers, etc...). This tutorial will cover the different features of the App Creator and walk through building sample applications using this tool. Let's get started!

<div align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/26859947/91258203-d1f70380-e739-11ea-968a-6467b7200c50.png" width="600px"  />
  </kbd>
</div>

<div align="center">
<i align="center">Figure 1. The App Creator Interface.</i>
</div>

## Table of contents
1. Building a simple app.
2. Binding Actions.
3. Loading a dataset.
4. Template switching.
5. Template Duplication.
6. Creating Multi-selector Apps.
7. Creating Multi-device Apps. 

## Building a simple app

Let's look at how we can create the following user interface.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91259379-6ebaa080-e73c-11ea-8505-259516d84e75.png" width="600px"  />
</kbd>
</div>

<div align="center">
<i align="center">Figure 2. The Earth Engine App we're going to build in this section.</i>
</div>
<br  />

To start off, let's first open the App Creator by going on the following link: [eeappcreator.com](https://ee-app-creator.appspot.com/). The first thing we see is a configuration wizard used for setting up our app. We can enter a name in the `App Name` field and select one of the templates on the right hand side. Additionally, we can select from a variety of different color schemes. Let's select the `Light` palette and the `Left Side Panel` template for now and click `Continue`.

> A template refers to a particular widget layout. For example, the `Left side panel` template has a panel widget on the left hand side, while the `Right side legend` template contains a map legend to its bottom right side. Templates can either be for desktop or for mobile. Desktop templates refer to layouts that are suited for larger screen sizes while mobile templates refer to layouts that fit narrower screens. We can also create dynamically re-sizable templates using two independent apps as we will see later on in this tutorial.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91264434-9dd21180-e73e-11ea-96e5-586e1d47de30.png" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 3. App configuration wizard.</i>
</div>
<br  />

Now that we have selected our template. We can start off by adding widgets. The App creator has a panel on the left hand side that allows you to perform actions on the template. These actions include switching templates, adding widgets, and editing widget attributes. Let's look at how we can add widgets to the template.

Simply drag and drop the widgets you would like to add to a designated drop zone. The following figure demonstrates adding widgets to the left side panel of the template.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91271692-94e63d80-e748-11ea-9ed6-6b1ab00c5015.gif" height="400px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 4. Adding widgets to the template.</i>
</div>
<br  />

In order to edit widget attributes such as text and colour properties, we can simply click on the widget to display its editable fields. The following figure demonstrates how we can change the different attributes of the text widget to match our final result. You can also notice that changes are reflected directly on the UI.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91271599-6ff1ca80-e748-11ea-879d-d41a2edf4619.gif" height="400px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 5. Editing widget attributes.</i>
</div>
<br  />

Let's also add some padding on the panel widget by changing the value from `0px` to `8px`.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91271750-a6c7e080-e748-11ea-814f-b23dcb8ea4c3.gif" height="400px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 6. Editing the padding attribute on a panel widget.</i>
</div>
<br  />

Now that we are done creating our UI, let's look at how we can load our app in the `code editor`. We can click on the `Export` button positioned at the top right corner of the App Creator to get a code snippet that we can paste. Let's click on the `Copy` button to add the snippet to our clipboard.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91336589-20d78400-e7a0-11ea-9a33-f221d1e43add.gif" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 7. Exporting a template and copying code snippet.</i>
</div>
<br  />

If we take a closer look at the code snippet. We will see that it contains 3 lines of code. Which are all we need to load our app in the code editor. The first line imports the `App Creator` module. This module contains helpful methods for creating different types of apps (we will take a closer look at some of these methods later on in this tutorial). The second line calls the `createApp` method which takes in an auto-generated string defining our template. And the last line renders our app to the screen using the `draw` method.

```javascript
var AppCreator = require('...');

/**
 * Create app instance.
 */
var app = AppCreator.createApp('...');

/**
 * Draw app to screen. 
 */
app.draw();
```

We can now paste this snippet in the code editor to render our app.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91349787-ccd69a80-e7b3-11ea-9342-dffdc27c677d.gif" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 8. Running code snippet on the code editor.</i>
</div>
<br  />

Great! We have successfully created our app. 

In the following section, we will look at how to bind actions (i.e. Button clicks, Select changes, etc...) to our widgets.

## Binding Actions

The App Creator helps us quickly build user interfaces for our Earth Engine Apps. Once we have created a layout that we like, we can use the code editor to add functionality to it. The code editor provides an API that allows us to render `App Creator` interfaces and extract their widgets. We can then bind actions directly to those widgets just like we would with native code editor elements such as `ui.Button` or `ui.Select`. Let's look at an example of binding a callback to a button click.

In the previous section, we created an app using the `createApp` method. In order to bind an action to the button defined on the template, we first need to extract it. The app instance created provides a method called `widgets` which returns an ActiveDictionary of all the widgets available. The keys of the dictionary are the widget ids and the values are the native code editor elements (i.e. ui.Button, ui.Select, etc...). We can print `app.widgets()` to the console to see the widgets that are defined. We can then reference a widget by calling the `get` method passing in the id.

In the following snippet, we see that we can bind a callback by passing an anonymous function to the `onClick` method on the button. This callback will be executed whenever a click event is emitted.

```javascript
var AppCreator = require('...');

/**
 * Create app instance.
 */
var app = AppCreator.createApp('...');

/*
 * app.widgets() returns an activeDictionary of all
 * the widgets available.
 */
app.widgets().get('button-0').onClick(function() {
 print("Button clicked!");
});

app.draw();
```

Binding events to other elements such as `select`, `checkbox`, or `slider` follow a similar approach. The only difference is that they use the `onChange` methods for binding callbacks. We can see the methods available on each widget by checking the `Docs` tab on the left hand side (i.e. Searching for ui.Button).

In the next section, we will look at how we can load a dataset into our app.

## Loading a dataset

In this section, we are going to look at how we can load a dataset into the Earth Engine App that we created. We will load the `CGIAR/SRTM90_V4` dataset and visualize it on the map. The final result is shown below. 

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91382715-5740ed80-e7f8-11ea-80e9-1de7ffc786a7.png" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 9. The Earth Engine App built in this section visualizing the SRTM90_V4 dataset.</i>
</div>
<br  />

To load the dataset, we can create an `ee.Image` object passing in the dataset name like so `ee.Image('CGIAR/SRTM90_V4');`. We can then select the elevation data and create an `ee.Terrain.slope` object passing in the elevation. The following code snippet demonstrates this operation.

```javascript
/**
 * Load dataset.
 */
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);
```

Once we have selected the data that we want to visualize. We can display it on the map by adding it as a layer. We can use the `addLayer` method to perform this action. To retrieve the map in the first place, we can call the `app.widgets().get('<widget_id>')` method passing in the map id. The following snippet walks through this example. 

```javascript
/**
 * Retrieve the map from the created app.
 */
var map = app.widgets().get('map-template-0');

/**
 * Add properties to our map.
 */
map.setCenter(-112.8598, 36.2841, 10);
map.addLayer(slope, {min: 0, max: 60}, 'slope');
```

We can see what it all looks like when put together with the code created from the previous sections.

```javascript
var AppCreator = require('...');

/**
 * Create app instance.
 */
 var app = AppCreator.createApp('...');

/*
 * app.widgets() returns an activeDictionary of all
 * the widgets available.
 */
app.widgets().get('button-0').onClick(function() {
 print("Button clicked!");
});

/**
 * Load dataset.
 */
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);

/**
 * Retrieve the map from the created app.
 */
var map = app.widgets().get('map-template-0');

/**
 * Add properties to our map.
 */
map.setCenter(-112.8598, 36.2841, 10);
map.addLayer(slope, {min: 0, max: 60}, 'slope');

/**
 * Draw app to screen.
 */
app.draw();   
```

And that's it! We have successfully created an end-to-end Earth Engine App using the App Creator.

In the following sections we will look at other features of the App Creator and the different types of apps that we can build using the code editor API. 

## Template Switching 

Now that we have looked into creating an end-to-end app using the App Creator and the code editor, let's dive deeper into the features available to us on the App Creator. To start off, we're going to look at template switching. 

Template switching allows us to change templates in the App Creator without having to start from scratch. This means that any widget added to the current template will be transferred across. To switch templates, we can simply go on the templates tab in the left side panel and select the template that we want. 

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91482901-cb20db80-e874-11ea-85a3-0c46f45343a1.gif" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 10. Example of switching between a `Left Side Panel` template and a `Right Side Panel` template.</i>
</div>
<br  />

As we can see, widgets are automatically transferred into the new template either directly on one of its panels or on the App Creator's scratch panel on the right hand side. Widgets are added to the scratch panel if no panels match the one they were originally in from the previous template. 

Template switching can be useful for quickly trying out new designs and layouts. It also provides flexibility in the App development process. In the next section, we're going to look at how to duplicate our templates in order to quickly build multiple variations. 

## Template Duplication

Template duplication lets us build multiple variations of our app. This could be useful for building apps with multi-lingual, multi-theme, and multi-device support. In this section we are going to look at how we can build a Spanish version of the app we created earlier. 

To duplicate a template, we can click on the `duplicate` button on the top-right side. This will open a new browser tab with the initial configuration wizard displayed. At this point, we can select any template we want to use and have our data transferred across. For the purpose of this app, we will want to select the same template, `Left Side Panel`.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91486054-beeb4d00-e879-11ea-9790-a680735733b1.gif" width="600px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 11. Example of duplicating a template.</i>
</div>
<br  />

Once, we have selected the template, we can now edit all of our text fields to be in Spanish like so.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91467092-17acec80-e85e-11ea-82fa-9fee9babbc68.png" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 12. Spanish version of the app created in section 1.</i>
</div>
<br  />

In order to build an app that switches between the English and Spanish versions, we can use the method available to us on the code editor called `createMultiSelectorApp`.  We will dive deeper into the code implementation in the next section. For now, let's export our new Spanish app and copy the code snippet.

## Creating Multi-Selector Apps 

In this section, we're going to look at how we can create a multi-lingual app that supports English and Spanish. This will be achieved by using the `createMultiSelectorApp` API. Here is what the final result will look like. 

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91480955-ab3be880-e871-11ea-8e0e-69effe65fc0d.gif" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 13. The multi-lingual app built by the end of this section that supports English and Spanish.</i>
</div>
<br  />

The `createMultiSelectorApp` API lets us build switchable apps. This allows us to build apps that offer multi-lingual or multi-theme support. Similarly, we can build apps that render different data on select changes. Let's look at how the method is called.  

The `createMultiSelectorApp` method takes in an optional object with the keys being the name of the app and the values being the apps created using `createApp`. For example, If we want to create a multiSelectorApp with English and Spanish support, we will have something that looks like this.

```Typescript
/**
 * Create app instances.
 */
 var english = AppCreator.createApp('...');
 var spanish = AppCreator.createApp('...');

/**
 * Create a multiSelectorApp object passing in the apps created above.
 */
var multiSelectorApp = AppCreator.createMultiSelectorApp({
  English: english,
  Spanish: spanish
});

/**
 * Draw app to screen.
 */
 multiSelectorApp.draw();
```

Note that the keys of the object passed in to the `createMultiSelectorApp` method are used as values in the select menu. 

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91470516-cce1a380-e862-11ea-814a-edefb9ff9554.png" width="200px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 14. Example of a select drop down menu used in multi-selector apps.</i>
</div>
<br  />

Another way to add app instances into the `multiSelectorApp` object is to use the set method passing in the name and app as arguments. Here is an example of how that looks.

```Typescript
/**
 * Create app instances.
 */
 var english = AppCreator.createApp('...');
 var spanish = AppCreator.createApp('...');

/**
 * Create a multiSelectorApp object.
 */
var multiSelectorApp = AppCreator.createMultiSelectorApp();

/**
* Add app instances.
*/
multiSelectorApp.set('English', english);
multiSelectorApp.set('Spanish', spanish);

/**
 * Draw app to screen.
 */
 multiSelectorApp.draw();
```

As you can see above, we created an empty `multiSelectorApp` object and added the apps created in a following step. Lastly, let's look at how this code works with the rest of our example from the first 3 sections. This includes binding actions to buttons on each version and loading a dataset on each map.

```Typescript
var AppCreator = require('...');

/**
 * Create app instance.
 */
 var english = AppCreator.createApp('...');
 var spanish = AppCreator.createApp('...');

function buttonClick() {
  print("Button clicked!");
}

/*
 * app.widgets() returns an activeDictionary of all
 * the widgets available.
 */
english.widgets().get('button-0').onClick(buttonClick);
spanish.widgets().get('button-0').onClick(buttonClick);

/**
 * Retrieve the generated map from each app.
 */
var englishMap = english.widgets().get('map-template-0');
var spanishMap = spanish.widgets().get('map-template-0');

/**
 * Get dataset.
 */
var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);

/**
 * Use the map here.
 */
englishMap.setCenter(-112.8598, 36.2841, 10);
englishMap.addLayer(slope, {min: 0, max: 60}, 'slope');

spanishMap.setCenter(-112.8598, 36.2841, 10);
spanishMap.addLayer(slope, {min: 0, max: 60}, 'slope');

/**
 * Create multiSelectorApp.
 */
var multiSelectorApp = AppCreator.createMultiSelectorApp({
  English: english,
  Spanish: spanish
});

/**
 * Draw app to screen.
 */
 multiSelectorApp.draw();
```

And now our app is complete! This approach can also be used for other use cases such building a multi-themed app with light and dark modes.

In the next section, we're going to look at how we can create dynamically re-sizable apps using the `createMultiDeviceApp` API.

## Creating Multi-Device Apps

In order to create apps that adjust to all screen sizes, the App Creator module provides a method called `createMultiDeviceApp` that lets us create dynamically re-sizable templates. Let's look at the app that we're going to create by the end of this section. 

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91491828-a2074780-e882-11ea-9d64-4c195bcc0d43.gif" width="500px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 15. A dynamically re-sizable app created using the createMultiDeviceApp API.</i>
</div>
<br  />

While building this app, we're also going to learn how to quickly change themes by selecting one of the pre-existing color palettes. 

Let's start off from the app built in section 1. To achieve the dark themed look as the figure above displays, we can change the color palette using the drop down menu right above the story board. As we can see, there are a set of pre-defined palettes to choose from. Let's select the palette with the name `aubergine`. The next step is to change the styling on the map widget. We can do this by clicking on the map and setting the `Map Styles` property to `silver`. The following figure demonstrates these steps.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91520199-b4a17100-e8c2-11ea-96bb-a27853023037.gif" width="600px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 16. Example of changing color palettes and map styles.</i>
</div>
<br  />
 
After we've changed the theme, lets duplicate the app by clicking on the `duplicate` button on the top right corner. We will use the new copy for creating our mobile version. In the new browser tab, let's add a name in the `App name` field, select `aubergine` for the color palette, select `Left Drawer Mobile` for the template, and click `Continue`.

We will notice that the scratch panel on the right hand side has been populated by widgets from the previous template. Lets drag and drop those widgets onto the new one. We will also want to change the map styling to `silver`. Here is what the final result should look like.

<div align="center">
<kbd>
<img src="https://user-images.githubusercontent.com/26859947/91521514-d05a4680-e8c5-11ea-9dd2-01fee97090cb.png" width="300px"  />
</kbd>
</div>
<div align="center">
<i align="center">Figure 17. The mobile version of the app created in this section.</i>
</div>
<br  />

In order to create a dynamically re-sizable app using the two templates created above, we will need to import them into the code editor and pass them as arguments to the `createMultiDeviceApp` method.

Let's do this by exporting both templates and adding them to the code editor. The merged code output should look like this.

```Typescript
var AppCreator = require('...');

/**
 * Create desktop and mobile apps.
 */
var desktop = AppCreator.createApp('...');
var mobile = AppCreator.createApp('...');

/**
 * Create a multiDeviceApp object.
 */
var multiDeviceApp = AppCreator.createMultiDeviceApp({desktop: desktop, mobile: mobile});

/**
 * Draw app to screen. 
 */
multiDeviceApp.draw();
```

We can notice that the `createMultiDeviceApp` takes in an object with the keys `desktop` and `mobile`. The values passed to those keys are single app instances created using the `createApp` API. The method then creates an app that re-renders on smaller screen sizes to display the mobile version. 

And that's it! We have successfully created an app that dynamically resizes to fit smaller screens. If we would like to bind actions to it or add map layers, we can follow the same approach as we used for multi-selector apps.
