<h1 align="center">Earth Engine App Creator</h1>

<div align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/26859947/91258203-d1f70380-e739-11ea-968a-6467b7200c50.png" width="600px"  />
  </kbd>
</div>
<br/>

<p align="center">
The Earth Engine App Creator is an open source UI editor that lets users build rich and beautiful Earth Engine Apps with ease. 
The App Creator was developed to help users quickly build user interfaces for their apps without needing to write any code. 
Apps developed using the App Creator can be imported into the code editor for further development (i.e. Binding actions, Loading datasets, Adding map layers, etc...). This doc walks through some of the features of the App Creator and looks at how one can set up a development environment locally. 
Let's get started!
</p>

___

The core features of the App Creator revolve around its templates. A template can be defined as a particular layout configuration (i.e. Left Side Panel, Right Side Legend, etc...). Here are some examples of what a template may look like.

<div align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/26859947/91582656-1a6f1680-e91e-11ea-90f4-58a3c7d353e0.png" width="400px"  />
  </kbd>
</div>
<br/>

Templates are stored and shared using a JSON structure. This allows us to keep track of parent/child relationships for each widget and to easily recreate our UI in different formats. In particular, we are interested in building this JSON in the App Creator and converting it into a functional interface on the code editor using native elements such as ui.Panel, ui.Button, etc... When using the App Creator, the JSON representation is automatically updated when you add, edit, or delete widgets. Once you have finished building your app, you can export a code snippet containing a serialized JSON string describing your template. An example of a JSON representing a `Left Side Panel` template is shown below. 

```typescript
{
	"config": {
		"parentID": "left-side-panel",
		"parentName": "Left Side Panel",
		"id": "sbwpqeggsr849udg28hotst2p43bwly3",
		"name": "My first app",
		"device": "desktop"
	},
	"widgets": {
		"panel-template-0": {
			"id": "panel-template-0",
			...
			"children": ["panel-template-1", "map-template-0"],
			"uniqueAttributes": {
				"layout": "row"
			},
			"style": {
				"height": "100%",
				"width": "100%",
				"padding": "0px",
				...
			}
		},
		"panel-template-1": {
			"id": "panel-template-1",
			...
			"children": ["label-0"],
			"uniqueAttributes": {
				"layout": "column"
			},
			"style": {
				...
			}
		},
		"map-template-0": {
			"id": "map-template-0",
			"children": [],
			"uniqueAttributes": {
				"zoom": "10",
				"latitude": "37.419857",
				"longitude": "-122.078827",
				...
			},
			"style": {
				...
			}
		},
		"label-0": {
			"id": "label-0",
			...
			"children": [],
			"uniqueAttributes": {
				"value": "Hello World",
				"targetUrl": ""
			},
			"style": {
				...
			}
		}
	}
}
```

As we can see from the JSON above, we have two main objects to consider (`config` and `widgets`). The `config` object contains meta data about the template such as its id, name, device compatibility, etc... While the `widgets` object contains all the widget meta data for our app with their parent/child relationships included.

One constraint with building templates is that we must have a widget with the id `panel-template-0`. This acts as the root node of our widget tree. This constraint is necessary because our parsing algorithm starts by looking for a root node with this specific id when recreating the DOM.  

Here is a visualization of how our JSON structure maps to a UI layout.

<div align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/26859947/91591930-bf442080-e92b-11ea-9346-c69051602e28.png" />
  </kbd>
</div>
<br/>

We can see that the widgets with ids `panel-template-1` and `map-template-0` are declared as children to `panel-template-0` and how that relationship is reflected in the UI. Notice that the child ordering in the JSON is important because having `["panel-template-1", "map-template-0"]` renders a different layout than `["map-template-0", "panel-template-1"]`.


## Setup

switch to client directory:

```bash
cd client
```

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce a JavaScript bundle that can be served to your browser.

To build the bundle, we can run the build command like so:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following
command in a separate shell:

```bash
npm run build:watch
```

## Dev Server

This repository uses open-wc's [es-dev-server](https://github.com/open-wc/open-wc/tree/master/packages/es-dev-server) for previewing the project without additional build steps. ES dev server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view
at http://localhost:8000/dev/index.html.

## Go server

Running the dev server only serves the client files. Alternatively, you can run the full stack app by executing the following command from the `app creator` directory.

```bash
go run main.go
```

This serves the client side files from the static folder. In order to update the static folder with the latest webpack bundle,
you can run the following command from the client directory.

```bash
npm run build:prod
```

## Testing

This repository uses Karma, Chai, Mocha, and the open-wc test helpers for testing. See the [open-wc testing documentation](https://open-wc.org/testing/testing.html) for more information.

Tests can be run with the `test` command:

```bash
npm test
```

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Polymer Project's style. You can change this in `.prettierrc.json`.
