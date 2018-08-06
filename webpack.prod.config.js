const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'lib/',
      to: 'lib/',
    }, {
      from: 'index.html',
      to: 'index.html',
    }]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new CompressionPlugin(),
  ],
});
