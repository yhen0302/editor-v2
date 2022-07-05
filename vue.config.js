const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// 捕获错误
/*
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});
*/

const args = process.argv.slice(2)
let webpackConf = {
  plugins: [
    new webpack.DefinePlugin({
      IS_EDITOR: true
    })
  ]
}

if (args.includes('--sdk')) {
  console.log('merge')
  webpackConf = merge(webpackConf, require('./bunder/sdk.js'))
}

module.exports = {
  publicPath: '/demo/editorV2/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  },
  configureWebpack: webpackConf,
  transpileDependencies: []
}
