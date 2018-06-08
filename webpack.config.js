const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: './src/helper.js',
    settings: './src/settings.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch:true,
  resolve: {
      extensions: ['.js','.ts']
  },
  plugins: [
      new HtmlWebpackPlugin({
          hash: true,
          title: 'html generate wiht webpack',
          myPageHeader: 'Hello world',
          template: './src/index.html',
          chunks: ['vendor','app'],
          filename: './index.html'
      }),
      new HtmlWebpackPlugin({
        hash: true,
        title: 'Other web page',
        myPageHeader: 'Hello Settings',
        template: './src/index.html',
        chunks: ['vendor','settings'],
        filename: './settings.html'
    })
  ]
};