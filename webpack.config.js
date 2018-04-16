const path = require('path');

module.exports = {
  entry: ["babel-polyfill", "./dest/js/index.js"],
  mode: 'development',
  // devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
