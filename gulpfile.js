var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
autoPrefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
	connect.server({
		root: '.',
		port: 4001
	})
});
/* Js Compiler */
gulp.task('concat-js', function() {
  gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/foundation-sites/dist/js/foundation.min.js',
			'js/**/*.js'
		])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/'));
});
/* Sass Compiler */
gulp.task('sass', function () {
    gulp.src('sass/style.scss')
				.pipe(sourcemaps.init())
				.pipe(sass({ includePaths: './node_modules/foundation-sites/scss' }).on('error', sass.logError))
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoPrefixer('last 10 versions'))
				.pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/'))
});
/* Watcher configuretion*/
gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['concat-js'])
	gulp.watch('sass/**/*.scss', ['sass'])
})

gulp.task('default', ['concat-js', 'connect', 'sass', 'watch'])
