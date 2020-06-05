/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del'); //delete the files from the specified folder
var concat = require('gulp-concat'); //bundle the file into one
var uglify = require('gulp-uglify'); //compress the file
var cleancss = require('gulp-clean-css'); //minify the css file
var sourcemaps = require('gulp-sourcemaps'); //generate sourcemap file for debugging in production
var gulpif = require('gulp-if'); //condition
var spsave = require('gulp-spsave'); //upload file into SharePoint
var htmlreplace = require('gulp-html-replace'); //replace html
var cachebust = require('gulp-cache-bust'); //add hash to js and css files to avoid browser cache

var settings = require('./settings.json'); //read the settings info from file

gulp.task('clean-js', function () {
    return del([
        'release/js/*.*'
    ]);
});

gulp.task('clean-css', function () {
    return del([
        'release/css/*.*'
    ]);
});

gulp.task('clean-html', function () {
    return del([
        'release/*.html'
    ]);
});

gulp.task('build-js', ['clean-js'], function () {
    return gulp.src('./dev/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('release.js'))
        .pipe(gulpif('*.js', uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./release/js'));        
});

gulp.task('build-css', ['clean-css'], function () {
    return gulp.src('./dev/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('release.css'))
        .pipe(gulpif('*.css', cleancss()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./release/css'));
});

gulp.task('replace-html', ['clean-html'], function () {
    return gulp.src('./dev/index.html')
        .pipe(htmlreplace(
            {
                'css': '../Apps/SPBuildAutomation/release/css/release.css',
                'js': '../Apps/SPBuildAutomation/release/js/release.js'
            }
        ))
        .pipe(gulp.dest('./release'));
});

gulp.task('cache-bust', ['build-js', 'build-css', 'replace-html'], function () {
    return gulp.src('./release/*.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./release'));
});

gulp.task('upload-js-to-sp', ['cache-bust'], function () {
    return gulp.src("./release/js/*.*")
      .pipe(spsave({
          siteUrl: settings.siteurl,
          folder: settings.jsFilePath
      }, settings));
});

gulp.task('upload-css-to-sp', ['cache-bust'], function () {
    return gulp.src("./release/css/*.*")
      .pipe(spsave({
          siteUrl: settings.siteurl,
          folder: settings.cssFilePath
      }, settings));
});

gulp.task('upload-html-to-sp', ['cache-bust'], function () {
    return gulp.src("./release/*.html")
      .pipe(spsave({
          siteUrl: settings.siteurl,
          folder: settings.htmlFilePath
      }, settings));
});

gulp.task('watch-file-changes', function () {
    gulp.watch('dev/js/**/*.js', ['upload-js-to-sp']);
    gulp.watch('dev/css/**/*.css', ['upload-css-to-sp']);
    gulp.watch('dev/*.html', ['upload-html-to-sp']);
});

gulp.task('default', ['watch-file-changes']);
