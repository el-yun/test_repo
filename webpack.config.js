const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const styleLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
const moduleCssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
}
const config = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  entry: ['./src/index'],
  output: {
    filename: '[name]-bundle-[chunkhash:32].js',
    publicPath: '/',
    environment: {
      // for IE support
      arrowFunction: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /(node_modules\/.*)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            rootMode: 'upward',
          },
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },

      {
        test: /\.scss$/,
        exclude: /node_modules\/(?!(swiper).*)/,
        use: [styleLoader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules\/(?!(react-date-range).*)/],
        use: [styleLoader, 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|cur)$/i,
        enforce: 'post',
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[hash:7].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dunamu Frontend',
      template: 'src/index.html',
    }),
    process.env.NODE_ENV !== 'production' && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
}

module.exports = function (env, argv) {
  if (argv.mode === 'production') {
    process.env.NODE_ENV = 'production'
    config.devtool = false
  }

  config.plugins.unshift(
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_ENV: 'development',
    })
  )

  return config
}
