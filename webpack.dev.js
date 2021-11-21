'use strict'

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HTMLPlugin({
      template: "./src/page/index.html",
      filename: "index.html",
      inject: true,
      chunks: ["app"]
    }),
    new HTMLPlugin({
      template: "./src/page/product.html",
      filename: "pro.html",
      inject: true,
      chunks: ["use"]
    }),
    new webpack.HotModuleReplacementPlugin(), // 开发环境运行热更新
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    stats: 'errors-only',
  }
};

module.exports = merge(baseConfig, devConfig);

console.log(`iiii---: ${process.env.UIO}`)
