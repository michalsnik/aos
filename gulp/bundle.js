var gulp            = require('gulp');
var watchify        = require('watchify');
var browserify      = require('browserify');

var uglify          = require('gulp-uglify');
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var gutil           = require('gulp-util');
var sourcemaps      = require('gulp-sourcemaps');

var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var browserifyOptions = {
    entries: ['./src/js/aos.js'],
    debug: true
};

var bundle = watchify(browserify(browserifyOptions))
                .on('update', makeBundle)
                .on('log', gutil.log);

function makeBundle() {
    return bundle.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('aos.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({
            stream: true
        }));
}

module.exports = makeBundle;
