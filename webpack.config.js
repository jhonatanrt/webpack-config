const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs')

function generateHtmlPlugins (templateDir, nameFile) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir + nameFile))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
      filename: `./Views/${nameFile}/${name}.cshtml`,
      template: path.resolve(__dirname, `${templateDir}/${nameFile}/${name}.${extension}`)
    })
  })
}

const htmlPluginsShared = generateHtmlPlugins('./src/views/','Shared/')
const htmlPlugins = generateHtmlPlugins('./src/views/','Cips/')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'razor')
  },
  // watch:true,
  resolve: {
      extensions: ['.js','.ts','.pug']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
          name: '[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true
  },
  plugins: [
      new CopyWebpackPlugin([
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
  .concat(htmlPluginsShared)
  .concat(htmlPlugins)
};