const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs') //兼容性
const babel = require('rollup-plugin-babel')
const vue = require('rollup-plugin-vue')
const terser = require('rollup-plugin-terser').terser
const replace = require('rollup-plugin-replace')
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const cssnano = require('cssnano')
const html = require('rollup-plugin-fill-html')
// const visualizer = require('rollup-plugin-visualizer')
const isProduction = process.env.NODE_ENV === 'production'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const rollupConfig = {
  input: './src/main.js',
  output: {
    file: 'dist/app.js',
    // format: 'umd',
    format: 'iife',
    name: 'app',
    sourcemap: false,
    treeshake: true
  },
  plugins:[
    html({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    // css(),
    // rollupless(),
    postcss({
      // sourcemap: true,
      inject: isProduction ? false : true,
      extract: 'dist/css/bundle.css',
      modules: false, // 不要开启，开启后无法使用element的样式
      extensions: ['.less', '.css'],
      plugins: isProduction? [cssnano] : []
    }),
    vue({
      // styleToImports: true,
      // extract css to a file
      css: false
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: true,
      runtimeHelpers: true
    }),
    serve('dist'),
    livereload('dist')
    // terser()
  ]
}

module.exports = rollupConfig