const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
// const tailwindcss = require('tailwindcss')
// const autoprefixer = require('autoprefixer')
const path = require('path')
const pImport = require('postcss-import')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('rollup-plugin-replace')
// import postcss from 'rollup-plugin-postcss'
const { getBabelOutputPlugin, babel } = require('@rollup/plugin-babel')

const env = process.env.NODE_ENV
const inputConf = {
  input: path.resolve(__dirname, '../src/index.ts'),
  external: ['vue', 'echarts','@/assets/icon/clip-1406.svg'],
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts', '.vue'] }),
    vue({
      target: 'browser',
      preprocessStyles: true,
      postcssPlugins: [pImport()]
    }),
    postcss({
      extensions: ['.css'],
      plugins: [pImport()]
    }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: ['@vue/babel-plugin-jsx'],
      extensions: ['.vue'],
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      IS_EDITOR: true
    }),
    typescript({ allowJs: true })
  ],
}

const outputConf = {
  file: path.resolve(__dirname, '../dist/index.js'),
  format: 'esm',
  name: 'EDITOR_SDK'
}

async function main() {
  if (env === 'production') {
    const bundler = await rollup.rollup(inputConf)
    await bundler.write(outputConf)
  } else {
    const watcher = rollup.watch({
      ...inputConf,
      output: [outputConf]
    })
    watcher.on('event', (event) => {
      console.log('event.code', event.code)
      if (event.code === 'ERROR') {
        console.log(event.error)
      }
    })
  }
}

main()
