const rollup = require('rollup')
const rollupPluginVue = require('rollup-plugin-vue')

const inputOptions = {
  plugins:[rollupPluginVue({
    css: true,
    compileTemplate: true
  })]
}
const outputOptions = {}


function main() {
  rollup.rollup(inputOptions)
}

main()
