const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const sourcePath = path.join(__dirname, '../src');

const postcssBasePlugins = [
  require('postcss-import')({
    addDependencyTo: webpack,
  }),
  require('postcss-cssnext'),
];
const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    publicPath: '/blog/',
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['env', 'react'],
              plugins: [
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                'transform-class-properties',
                'transform-decorators-legacy',
                ['import', { libraryName: 'antd', style: 'css' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          env !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          env !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcssBasePlugins,
            },
          },
          {
            loader: 'less-loader',
            query: {
              modifyVars: {
                '@text-color': '#666',
                '@primary-color': '#00ADB5',
                '@font-family': '\'PingFangSC-light\',\'AvenirNext-Regular\', \'sans-serif\'',
              },
            },
          },
        ],
      },
      { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url-loader?limit=10000&name=images/[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules',
    ],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      filename: 'index.html',
      template: 'index.html',
    }),
    new CopyWebpackPlugin([{
      from: 'lib/',
      to: 'lib/',
    }]),
  ],
};
