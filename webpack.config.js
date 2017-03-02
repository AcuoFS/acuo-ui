var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: [
    'whatwg-fetch',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['es2015', {modules: false}], 'react']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
      },
      {
        test: /\.css$/,
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
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 7,
              interlaced: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/static/react-dropzone', to: './css/react-dropzone'},
      {from: './src/static/reset.css', to: './css/reset.css'},
      {from: './images', to: './images'}
    ]),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(require('./src/constants/config').get(process.env.DOCKER_ENV))
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};