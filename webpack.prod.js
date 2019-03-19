const merge = require('webpack-merge');
const common = require('./webpack.babel.common');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
});
