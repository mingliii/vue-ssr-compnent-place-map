const {servers} = require('../src/entries');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');
const merge = require('webpack-merge');

const base = require('./webpack.base.config');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
  entry: servers,
  target: 'node',
  // This tells the server bundle to use Node-style exports
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {loader: 'css-loader', options: {sourceMap: !isProduction}},
        ]
      },
    ]
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin(),
  ]
});