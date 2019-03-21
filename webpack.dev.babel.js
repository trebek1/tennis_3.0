const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3711,
    proxy: {
      '/courts': {
        target: 'http://0.0.0.0:3000',
        changeOrigin: false,
        secure: false,
        logLevel: 'debug',
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
