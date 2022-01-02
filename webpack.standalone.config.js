/* eslint-disable import/no-extraneous-dependencies */
const base = require('./webpack.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const baseObj = base(env);
  return {
    ...baseObj,
    entry: './src/standalone.js',
    output: {
      filename: 'kareoke.standalone.[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin()]
  };
};
