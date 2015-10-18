var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');



// tasks

gulp.task('transform', function () {
  return gulp.src('./client/static/jsx/wrapper.js')
    .pipe(plumber())
    .pipe(browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./client/static/build'))
    .pipe(size());
});

gulp.task('clean', function () {
  return gulp.src(['./client/static/build'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function () {
  gulp.start('transform');
  gulp.watch('./client/static/jsx/wrapper.js', ['transform']);
});
