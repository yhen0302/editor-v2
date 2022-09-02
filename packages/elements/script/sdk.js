const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const pImport = require('postcss-import')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const { getBabelOutputPlugin, babel } = require('@rollup/plugin-babel')
const less = require('postcss-less')
const path = require('path')

const env = process.env.NODE_ENV
console.log(env)
const inputConf = {
  input: path.resolve(__dirname, '../src/main.ts'),
  external: ['@/assets/icon/clip-1406.svg'],
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts', '.vue'] }),
    vue({
      target: 'browser',
      preprocessStyles: true,
      postcssPlugins: [pImport()],
      postcssOptions: {
        parser: less
      }
    }),
    postcss({
      extensions: ['.css'],
      plugins: [pImport()],
      parser: less
    }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: ['@vue/babel-plugin-jsx'],
      extensions: ['.vue']
    }),
    replace({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      IS_EDITOR: true
    }),
    typescript({ allowJs: true })
  ]
}
const outputConfs = [
  {
    file: './sdk/index.js',
    format: 'umd',
    name: 'EDITOR_SDK',
    globals: {
      Vue: 'vue'
    }
  },
  {
    file: path.resolve(__dirname, '../../../public/sdk/index.js'),
    format: 'umd',
    name: 'EDITOR_SDK',
    globals: {
      Vue: 'vue'
    }
  }
]

async function main() {
  if (env === 'production') {
    inputConf.plugins.push(terser())
    const bundler = await rollup.rollup(inputConf)
    await bundler.write(outputConfs[0])
    await bundler.write(outputConfs[1])
  } else {
    const watcher = rollup.watch({
      ...inputConf,
      output: outputConfs
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
