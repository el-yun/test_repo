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
    '@babel/preset-react',
  ]

  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-numeric-separator',
    'babel-plugin-styled-components',
    !api.env('production') && 'react-refresh/babel',
  ].filter(Boolean)

  return {
    presets,
    plugins,
  }
}
