const path = require('path')

const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const typescript = require('rollup-plugin-typescript2')
const commonJs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const css = require('rollup-plugin-css-only')
const { terser } = require('rollup-plugin-terser')
const  postcss  = require('rollup-plugin-postcss')
const {babel} = require('@rollup/plugin-babel')

const inputOptions = {
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts', '.vue'],
      browser:true
    }),
    typescript(),
    vue(),
    postcss({
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }),
    commonJs({
      exclude:[/\.vue/],
      esmExternals:true
    }),
    // getBabelOutputPlugin({ configFile: path.resolve(__dirname, '../babel.config.js')}),
    // css({ output: path.resolve(__dirname,'../sdk/kt-element-sdk.css') }),
    terser()
  ],

  // external: ['vue', 'echarts'],
  input: path.resolve(__dirname, '../packages/main.ts')
}

const outputOptions = {
  file: path.resolve(__dirname,'../sdk/kt-element-sdk.js'),
  format: 'umd',
  name: 'EditorSdk',
}

async function main() {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

main()
