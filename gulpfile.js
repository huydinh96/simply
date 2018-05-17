var gulp        = require('gulp');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('disk/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(gulp.dest('scss/merged'))        
        .pipe(sass())
        .pipe(rename('styles.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('page/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['page/js/0_helper.js', 'page/js/1_main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('page/js/merged'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('page/js'));
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: 'http://localhost:8080/simply'
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('page/js/*.js', ['lint', 'scripts']);
    gulp.watch(['page/js/*.js'], browserSync.reload);
    gulp.watch(['page/css/*'], browserSync.reload);    
    gulp.watch(['page/*'], browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);