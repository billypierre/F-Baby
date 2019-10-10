const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = './dist/webclient';

module.exports = {
  resolve: {
    alias: {
      '@phino': path.resolve(__dirname, './lib'),
      '@webclient': path.resolve(__dirname, './lib/webclient'),
      '@webserver': path.resolve(__dirname, './lib/webserver')
    }
  },
  entry: {
      index: './lib/webclient/webclient.js'
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  node: { fs: 'empty' },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },

  devServer: {
    stats: 'minimal',
    host: '0.0.0.0',
    disableHostCheck: true,
    public: 'localhost:3000',
    port: 3000,
    historyApiFallback: true,
    open: false,
    proxy: {
      '/api': `http://localhost:${process.env.DEV_PORT || 8182}`
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './lib/public/index.html',
      favicon: './lib/public/favicon/favicon.ico',
      chunks: ['index']
    }),
    new webpack.IgnorePlugin(/\.\/locale$/)
  ]
};