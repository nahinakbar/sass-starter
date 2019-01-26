'use strict';

let gulp = require('gulp');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

let config = {
    paths: {
        src:  '.'
    }
};

// CSS
gulp.task('sass', function () {
    return gulp.src(config.paths.src + '/assets/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
          'Chrome >= 35',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 8',
          'Safari >= 8',
          'Android 2.3',
          'Android >= 4',
          'Opera >= 12']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.src + '/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest(config.paths.src + '/assets/css'));
});

gulp.task('sass:watch', function (done) {
    gulp.watch(config.paths.src + '/assets/scss/**/*.scss', gulp.series('sass'));
    done();
});

gulp.task('files:watch', function (done) {
    gulp.watch(config.paths.src + '/*.html').on('change', browserSync.reload);
    done();
});

// Live-reload
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.paths.src
        },
    });
});

gulp.task('watch',
            gulp.parallel('sass:watch', 'files:watch'));

gulp.task('serve',
            gulp.series('sass',
            gulp.parallel('watch', 'browserSync')));

gulp.task('default',
            gulp.series('serve'));
