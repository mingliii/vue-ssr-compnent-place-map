const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const base = require('./webpack.base.config');
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const {clients} = require("../src/entries/config");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
  entry: clients,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/public/',
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    sourceMapFilename: isProduction ? '[name].[hash].js.map' : '[name].js.map',
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: !isProduction}},
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer]
            }
          },
          'sass-loader',
        ],
      },
    ]
  },

  plugins: (isProduction ?
      [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        }),
        new VueSSRClientPlugin(),
        new CleanWebpackPlugin({
          cleanAfterEveryBuildPatterns: ['!vue-ssr-server-bundle.json'],
          cleanOnceBeforeBuildPatterns: ['!vue-ssr-server-bundle.json']
        })
      ] : [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          hmr: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueSSRClientPlugin(),
      ]
  )
});