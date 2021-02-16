const common = require('./webpack.common.js')
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html'
    })
  ],
  module: {
    rules: [{
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: false,
          hotReload: true
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  devServer: {
    disableHostCheck: true
  }
})
