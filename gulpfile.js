var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var minifyCss       = require('gulp-minify-css');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var watchify        = require('watchify');
var browserify      = require('browserify');
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var gutil           = require('gulp-util');
var sourcemaps      = require('gulp-sourcemaps');
var assign          = require('lodash.assign');
var Server          = require('karma').Server;

// Browserify & watchify

var browserifyOptions = assign({}, watchify.args, {
    entries: ['./src/js/aos.js'],
    debug: true
});
var bundle = watchify(browserify(browserifyOptions));

bundle.on('update', makeBundle);
bundle.on('log', gutil.log);

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

gulp.task('bundle', makeBundle);

// Sass

gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(concat('aos.scss'))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

// Tests

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

// Static server

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all browsers

gulp.task('bs-reload', function() {
    browserSync.reload();
});

// Developement task

gulp.task('watch', ['browser-sync', 'bundle', 'tdd'], function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('*.html', ['bs-reload']);
});

// Task for `gulp` command

gulp.task('default', ['watch']);

// Build js/css and run tests once

gulp.task('build', ['bundle', 'sass', 'test']);