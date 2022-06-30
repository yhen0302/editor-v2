const webpack = require('webpack')

module.exports = {
  publicPath: '/demo/editorV2',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  },
  configureWebpack:{
    plugins:[  new webpack.DefinePlugin({
      IS_EDITOR:true
    })
    ]
  },
  transpileDependencies: []
}
