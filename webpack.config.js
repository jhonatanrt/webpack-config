const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  // watch:true,
  resolve: {
      extensions: ['.js','.ts','.pug']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true
  },
  plugins: [
      new HtmlWebpackPlugin({
          hash: true,
          title: 'Application',
          template: './src/index.pug',
          filename: './index.html'
      }),
      new CopyWebpackPlugin([
        {
         from: 'dist/index.html',
         to: '../razor/_layout.cshtml'
        },
        {
          from: 'node_modules/bootstrap/',
          to: '../razor/lib/bootstrap/'
        },
        {
          from: 'node_modules/jquery/',
          to: '../razor/lib/jquery/'
        },
        {
          from: 'node_modules/popper.js/',
          to: '../razor/lib/popper.js/'
        }
      ])
  ]
};