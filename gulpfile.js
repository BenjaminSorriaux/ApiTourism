'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('styles', function() {
  return gulp.src('./scss/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('clean', function() {
  return del('./css/style.css');
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss',gulp.series(['clean','styles']));
});