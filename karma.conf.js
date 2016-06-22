// Karma configuration
// Generated on Mon Oct 19 2015 01:12:15 GMT+0200 (CEST)
var isTravis = process.env.TRAVIS || false;
var browsers = isTravis ? ['Chrome_travis_ci'] : ['Chrome'];
var singleRun = isTravis;

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: browsers,
    frameworks: ['jasmine-jquery', 'jasmine'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/index.js',
      {
        pattern: 'test/fixtures/**/*.html',
        watched: true,
        included: false,
        served: true
      }
    ],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.js?$/,
          exclude: [/bower_components/, /node_modules/],
          loader: 'babel'
        }, {
          test: /\.scss$/,
          loader: "css-loader?sourceMap!sass-loader"
        }]
      }
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine-jquery',
      'karma-jasmine',
      'karma-webpack'
    ],

    reporters: ['dots'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    port: 9876,
    singleRun: singleRun,
    colors: true,
    logLevel: config.LOG_WARN
  })
}
