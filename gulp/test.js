var gulp            = require('gulp');
var karma           = require('karma').Server;

var isTravis        = process.env.TRAVIS || false;
var pathToKarmaConf = __dirname.replace('/gulp', '');

module.exports =  function(done) {
    new karma({
        configFile: pathToKarmaConf + '/karma.conf.js',
        singleRun: isTravis
    }, done).start();
};
