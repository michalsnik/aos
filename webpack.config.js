var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/js/aos.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    publicPath: 'dist/',
    filename: 'aos.js',
    library: 'AOS',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map'
  },
  devServer: {
    contentBase: 'demo/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader!postcss-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('aos.css'),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
