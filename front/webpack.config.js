'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src/app'),
  entry: './app',
  output: { filename: '../build/build.js' },

  watch: NODE_ENV === 'development',
  watchOptions: { aggregateTimeout: 100 },

  devtool: 'cheap-module-inline-source-map',

  plugins: [
    // not create build if error was occurred
    new webpack.NoErrorsPlugin(),
    // for inserting variables to code
    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(NODE_ENV) }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.resolve(__dirname, 'src/app')
      ],
      query: { presets: ['es2015'] }
    }]
  }
};