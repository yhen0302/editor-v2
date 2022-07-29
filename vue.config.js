const webpack = require('webpack')

const env = process.env.NODE_ENV
console.log(env)
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
/*    module:{
      rules:[
        {
          test:/\.html$/,
          use:['html-loader']
        }
      ]
    },*/
    plugins:[  new webpack.DefinePlugin({
      IS_EDITOR:true,
      'process.env.NODE_ENV':env
    })
    ]
  },
  transpileDependencies: []
}
