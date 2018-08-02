const merge = require('webpack-merge');
const webpack = require('webpack');
const ip = require('ip');
const getWebPort = require('@microants/get-webport');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: {
      index: '/blog/',
    },
    open: true,
    openPage: 'blog',
    host: ip.address(),
    port: getWebPort(),
    publicPath: '/blog/',
    proxy: [
      {
        context: '/blog/api',
        target: 'http://127.0.0.1:7001',
        pathRewrite: {
          '^/blog': '',
        },
        changeOrigin: true,
        secure: false,
      }, {
        context: '/blog/socket.io',
        target: 'http://127.0.0.1:7001',
        pathRewrite: {
          '^/blog': '',
        },
        changeOrigin: true,
        secure: false,
      },
    ],
  },
});
