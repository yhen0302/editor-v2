module.exports = {
  publicPath: '/demo/editorV2',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
  transpileDependencies: [],

}
