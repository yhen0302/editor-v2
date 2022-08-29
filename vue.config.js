module.exports = {
  publicPath: '/demo/2206/editor',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  },
  transpileDependencies: []
}
