var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: 'bundle.js',
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['es2015', {modules: false}], 'react', "stage-0"]
        }
      },
      {
        test: /\.css$/,
        include: [/src/, /node_modules\/react-datepicker\/dist\/react-datepicker-cssmodules\.css/],
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]'
            }
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: true,
          //     optimizationLevel: 7,
          //     interlaced: false
          //   }
          // }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new CopyWebpackPlugin([
      {from: './src/static/react-dropzone', to: './css/react-dropzone'},
      {from: './src/static/react-select', to: './css/react-select'},
      {from: './src/static/reset.css', to: './css/reset.css'},
      {from: './src/static/react-datepicker', to: './css/react-datepicker'},
      {from: './images', to: './images'}
    ]),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(require('./src/constants/config').get(process.env.DOCKER_ENV))
    }),
    // Plugin will automatically create and inject any js(output.[hash].bundle.js) into index.html
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/proxy/**/**/**/**/**': {
        target: 'https://dev.acuo.com',
        changeOrigin: true
      }
    }
  }
};