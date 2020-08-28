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

The client directory contains the front-end application. Lets follow these steps to run a dev server.


## Setup

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

## Testing

This repository uses Karma, Chai, Mocha, and the open-wc test helpers for
testing. See the
[open-wc testing documentation](https://open-wc.org/testing/testing.html) for
more information.

Tests can be run with the `test` command:

```bash
npm test
```

## Dev Server

This repository uses open-wc's
[es-dev-server](https://github.com/open-wc/open-wc/tree/master/packages/es-dev-server)
for previewing the project without additional build steps. ES dev server handles
resolving Node-style "bare" import specifiers, which aren't supported in
browsers. It also automatically transpiles JavaScript and adds polyfills to
support older browsers.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view
at http://localhost:8000/dev/index.html.


## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and
[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In
addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to
type-check and lint lit-html templates with the same engine and rules as
lit-plugin.

The rules are mostly the recommended rules from each project, but some have been
turned off to make LitElement usage easier. The recommended rules are pretty
strict, so you may want to relax them by editing `.eslintrc.json` and
`tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been
pre-configured according to the Polymer Project's style. You can change this in
`.prettierrc.json`.
