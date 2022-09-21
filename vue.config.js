const webpack = require('webpack')
const env = process.env.NODE_ENV
module.exports = {
  publicPath: '/edit',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  },
  configureWebpack: {
    devtool: 'souce-map',
    /*    module:{
      rules:[
        {
          test:/\.html$/,
          use:['html-loader']
        }
      ]
    },*/
    plugins: [
      new webpack.DefinePlugin({
        IS_EDITOR: true,
        'process.env.NODE_ENV': env
      })
    ]
  },

  transpileDependencies: ['tests/*']
}
