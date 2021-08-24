module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-typeof-symbol'],
        targets: {
          esmodules: true,
        }
      }
    ]
  ],
  plugins: [
    process.env.PLUGINS && 'transform-es2015-modules-strip',
    ['@babel/proposal-object-rest-spread', {loose: true, useBuiltIns: true}]
  ].filter(Boolean),
  env: {
    test: {
      plugins: [ '@babel/plugin-transform-modules-commonjs' ]
    }
  }
};
