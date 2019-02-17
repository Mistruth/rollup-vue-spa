const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs') //兼容性
// const uglify = require('rollup-plugin-uglify').uglify
const babel = require('rollup-plugin-babel')
const vue = require('rollup-plugin-vue')
const terser = require('rollup-plugin-terser').terser
const replace = require('rollup-plugin-replace')
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const cssnano = require('cssnano')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  input: './src/main.js',
  output: {
    file: 'dist/app.js',
    format: 'iife',
    name: 'app',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development')
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    vue(),
    babel({
      exclude: 'node_modules/**',
      babelrc: true,
      runtimeHelpers: true
    }),
    postcss({
      sourcemap: true,
      extract: true,
      extensions: ['.css'],
      plugins: (process.env.NODE_ENV === 'production' && [cssnano()])
    }),
    // terser()
  ]
}