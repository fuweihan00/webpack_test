'use strict'

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    use: './src/user.js',
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            },
          },
        ],
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
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  // stats: () => 'errors-only',
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minSize: 0,
          minChunks: 1,
          chunks: 'initial',
          priority: 2 // 该配置项是设置处理的优先级，数值越大越优先处理 
        },
        // commons: {
        //   name: "comomns",
        //   test: resolve("src/components"), // 可自定义拓展规则
        //   minChunks: 2, // 最小共用次数
        //   minSize: 0,   //代码最小多大，进行抽离
        //   priority: 1, //该配置项是设置处理的优先级，数值越大越优先处理 
        // },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new ParallelUglifyPlugin({
        // cacheDir: '.cache/', //缓存压缩，默认不缓存，设置存放位置开启
        test: /.js$/, //匹配需要压缩的文件，默认为/.js$/和Loader配置一样
        //include: [], 使用正则去选择需要被压缩的文件和Loader配置一样
        //exclude: [], 使用正则去去除不需要被压缩的文件和Loader配置一样
        //workerCount: 2, 开启几个子进程并发执行压缩
        // sourceMap: false, 是否输出source Map，开启会导致压缩变慢
        // uglifyJS: {}, 用于压缩ES6代码不可和uglifyJS同时使用
        uglifyJS: {//压缩ES5代码
          output: {
            // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
            beautify: false,
            //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            comments: false
          },
          compress: {
            //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
            // warnings: false,
            //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            drop_console: true,
            //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
            collapse_vars: true,
            // 提取出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        },
      }),
    ],
  },
};

console.log(`iiii---: ${process.env.UIO}`)
