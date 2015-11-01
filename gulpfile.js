var gulp            = require('gulp');
var browserSync     = require('browser-sync');

var taskBundle      = require('./gulp/bundle');
var taskSass        = require('./gulp/sass');
var taskTest        = require('./gulp/test');

// Browserify & watchify
gulp.task('bundle', taskBundle);

// Sass
gulp.task('sass', taskSass);

// Tests
gulp.task('test', taskTest);


// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Developement task
gulp.task('watch', ['browser-sync', 'bundle', 'test'], function() {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['watch']);

// Build js/css and run tests
gulp.task('build', ['bundle', 'sass', 'test'], function() {
    process.exit();
});
