const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  module: {
    entry: {
      app: './src/index.js',
      use: './src/user.js',
    },
    output: {
      filename: '[name]_[chunkhash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: 'file-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLPlugin({
      template: "./src/page/index.html",
      filename: "index.html",
      inject: true,
      chunks: ["app", "vendors"]
    }),
    new HTMLPlugin({
      template: "./src/page/product.html",
      filename: "pro.html",
      inject: true,
      chunks: ["use", "vendors"]
    }),
  ],
};