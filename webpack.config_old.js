var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    javascript: './src/index.js',
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new CopyWebpackPlugin([
      { from: './src/static/react-dropzone', to: './css/react-dropzone' },
      { from: './src/static/reset.css', to: './css/reset.css'},
      { from: './images', to: './images'}
    ]),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(require('./src/constants/config').get(process.env.DOCKER_ENV))
    })
  ],
  devServer: {
    colors: true,
    progress: true,
    historyApiFallback: true
  }
};