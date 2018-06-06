const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    aos: './src/js/aos.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: '[name].min.js',
    library: 'AOS',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    })
  ]
};
