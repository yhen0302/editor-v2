const path = require('path')

const rollup = require('rollup')
const rollupPluginVue = require('rollup-plugin-vue')
const typescript = require('rollup-plugin-typescript2')
const commonJs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const css = require('rollup-plugin-css-only')

const inputOptions = {
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts', '.vue']
    }),
    rollupPluginVue({
      css: true,
      compileTemplate: true
    }),
    typescript({
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    }),
    // commonJs(),
    css()
  ],
  external: ['vue', 'echarts'],
  input: path.resolve(__dirname, '../packages/main.ts')
}

const outputOptions = {
  file: 'kt-element-sdk.js',
  format: 'umd',
  name:'EditorSdk'
}

async function main() {
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions);
}

main()
