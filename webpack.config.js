const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new HtmlWebpackPlugin({
          hash: true,
          title: 'html generate wiht webpack',
          myPageHeader: 'Hello world',
          template: './src/index.html',
          filename: './index.html'
      })
  ]
};