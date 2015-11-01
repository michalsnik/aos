var gulp            = require('gulp');

var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var minifyCss       = require('gulp-minify-css');

var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

module.exports = function() {
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
}
