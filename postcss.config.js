module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('autoprefixer')({
      browsers: ['last 2 version', '>1%', 'ios 7'],
    }),
    require('postcss-px2rem')({
      remUnit: 100, // 基准值
    }),
  ],
};
