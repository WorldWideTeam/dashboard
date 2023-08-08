var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var Paths = {
    HERE: './',
    CSS: 'public/assets/css/',
    SCSS_TOOLKIT_SOURCES: './assets/scss/material-kit.scss',
    SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function () {
    return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write(Paths.HERE))
        .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function () {
    gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});