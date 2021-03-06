var gulp = require('gulp');
var pug = require('gulp-pug');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var webserver = require('gulp-webserver');

var config = {
  tmp: '.tmp',
  demo: '.tmp',
  views: {
    demo: 'demo/demo.pug',
    src: 'src/**/*.pug',
    dest: '.tmp/'
  },
  styles: {
    demo: 'demo/demo.scss',
    src: 'src/**/*.scss',
    dest: '.tmp'
  }
};

gulp.task('clean', function(cb){
  return rimraf(config.tmp, cb);
});

gulp.task('webserver', function(){
  return gulp.src(config.demo)
    .pipe(webserver({
      livereload: true,
      open: 'demo.html'
    }));
});

gulp.task('views', function(){
  return gulp.src(config.views.demo)
    .pipe(pug())
    .pipe(gulp.dest(config.views.dest));
});

gulp.task('styles', function(){
  return gulp.src(config.styles.demo)
    .pipe(sassLint())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('sass-lint', function () {
  return gulp.src(config.styles.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('watch', function(){
  gulp.watch(config.views.src, ['views']);
  gulp.watch(config.styles.src, ['sass-lint','styles']);

  gulp.watch(config.views.demo, ['views']);
  gulp.watch(config.styles.demo, ['sass-lint', 'styles']);
});

gulp.task('default', function(cb){
  runSequence(
    'clean',
    'sass-lint',
    ['views', 'styles'],
    'webserver',
    'watch',
    cb
  );
});
