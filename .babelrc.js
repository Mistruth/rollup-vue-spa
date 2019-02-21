module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      },
      //polyfill
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      corejs: false,
      helpers: true,
      regenerator: true,
      useESModules: false
    }]
  ]
}