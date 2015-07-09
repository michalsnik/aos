var gulp        = require('gulp');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// Sass

gulp.task('sass', function () {
    gulp.src('src/*.scss')
        .pipe(concat('aos.scss'))
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer({
                browsers: ['> 1%']
            })
        )
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});

// Js-concat-uglify

gulp.task('js', function() {
    gulp.src(['src/*.js'])
        .pipe(concat('aos.js'))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
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

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Task for `gulp` command

gulp.task('default',['browser-sync'], function() {
    gulp.watch('src/*.scss',['sass']);
    gulp.watch('src/*.js',['js']);
    gulp.watch("*.html", ['bs-reload']);
});