'use strict';

var fs = require('fs'),
    path = require('path'),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),

    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

// helpers
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

/**
 * Babel
 */
gulp.task('babel', function () {
    var examplesPath = 'examples/';
    var folders = getFolders(examplesPath);

    folders.forEach(function (folder) {
        gutil.log('building:', path.join(examplesPath, folder, '/src/main.js'));

        return browserify({
            entries: path.join(examplesPath, folder, '/src/main.js'),
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015']
        })
        .on('error', gutil.log)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(
            path.join(examplesPath, folder, 'build')
        ));
    });
});

gulp.task('babel:watch', function () {
    gulp.watch('examples/**/src/**/*.js', ['babel']);
});

/**
 * Sass
 */
gulp.task('sass', function () {
    gulp.src('./styles/sass/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./styles/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['babel', 'sass']);
