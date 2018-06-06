const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    aos: './src/js/aos.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    library: 'AOS',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: [/bower_components/, /node_modules/]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader', 'postcss-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    })
  ]
};
