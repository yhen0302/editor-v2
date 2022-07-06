const webpack = require('webpack')

module.exports = {
  publicPath: './',

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
