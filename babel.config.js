module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: 11,
        },
      }, // or whatever your project requires
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }],
  ]

  const plugins = [
    ['@babel/plugin-transform-runtime'],
    '@babel/plugin-proposal-numeric-separator',
    'babel-plugin-styled-components',
    !!api.env('production') && { plugins: ['react-refresh/babel'] },
  ].filter(Boolean)

  return {
    presets,
    plugins,
  }
}
