const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const pImport = require('postcss-import')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const path = require('path')

const env = process.env.NODE_ENV
const inputConf = {
  input: path.resolve(__dirname, '../src/main.ts'),

  plugins: [
    nodeResolve({ extensions: ['.js', '.ts', '.vue'] }),
    vue(),
    postcss({
      extensions: ['.css'],
      plugins: [
        pImport()
        // tailwindcss({}),
        // autoprefixer({}),
      ]
    }),
    replace({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      IS_EDITOR: true
    }),
    typescript({ allowJs: true })
  ]
  // external: ["vue"]
}
const outputConf = {
  file: './sdk/index.js',
  format: 'umd',
  name: 'EDITOR_SDK'
}

async function main() {
  if (env === 'production') {
    const bundler = await rollup.rollup(inputConf)
    await bundler.write(outputConf)
  } else {
    const watcher = rollup.watch({
        ...inputConf,
        output: [outputConf,{
          file: path.resolve(__dirname,'../../../public/sdk/index.js'),
          format: 'umd',
          name: 'EDITOR_SDK'
        }]
    })
    watcher.on('event',(event)=>{

      console.log('event.code',event.code)
      if(event.code === 'ERROR'){
        console.log(event.error)
      }
    })
  }
}

main()
