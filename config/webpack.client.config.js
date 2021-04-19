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

const cleanWebpackPlugin = new CleanWebpackPlugin({
  // cleanAfterEveryBuildPatterns: ['!vue-ssr-server-bundle.json', '!vue-ssr-client-manifest.json'],
  cleanOnceBeforeBuildPatterns: ['**/*', '!vue-ssr-client-manifest.json', '!vue-ssr-server-bundle.json']
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: isProduction ? '[name].[contenthash].css' : '[name].css',
  hmr: !isProduction,
});

const plugins = [
  miniCssExtractPlugin,
  !isProduction && new webpack.HotModuleReplacementPlugin(),
  new VueSSRClientPlugin(),
  cleanWebpackPlugin
].filter(Boolean);

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
  plugins
});