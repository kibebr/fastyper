const path = require('path')

module.exports = {
  entry: './App.js',
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
      }
    }, {
      test: /\.svg$/,
      use: {
        loader: 'svg-inline-loader'
      }
    }]
  },
  devServer: {
    disableHostCheck: true
  }
}
