const path = require('path');

module.exports = (env) => ({
  entry: './widgets/app-root.js',
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: 'webpack-bundle.js',
  },
  module: {
    rules: [],
  },
  mode: 'development',
  plugins: [],
});