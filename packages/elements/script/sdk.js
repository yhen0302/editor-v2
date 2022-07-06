const rollup = require('rollup')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const pImport = require('postcss-import')
const typescript = require('rollup-plugin-typescript2')
const {nodeResolve } = require('@rollup/plugin-node-resolve') 
const replace = require('rollup-plugin-replace')

console.log(process.env.NODE_ENV)
const inputConf = {
    input: './src/main.ts',
 
    plugins: [
        nodeResolve({extensions:['.js','.ts','.vue']}),
        vue(),
        postcss({
            extensions: [".css"],
            extract: true,
            plugins: [
                pImport(),
                tailwindcss({}),
                autoprefixer({}),
            ]
        }),
        replace({
            'process.env.NODE_ENV':`'${process.env.NODE_ENV}'`,
            'IS_EDITOR':true
        }),
        typescript({allowJs:true})
    ],
    // external: ["vue"]
}
const outputConf = {
    file: './sdk/index.js',
    format: 'umd',
    name:'EDITOR_SDK',
}


async function main() {
    const bundler = await rollup.rollup(inputConf)
    await bundler.write(outputConf)
}

main()