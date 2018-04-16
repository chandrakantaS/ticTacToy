const path = require('path'),
webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }]
  },
  stats: {
    colors: true
  }
};
