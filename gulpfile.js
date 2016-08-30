var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var rimraf = require('rimraf');

var config = {
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
  rimraf(config.demo, cb);
});

gulp.task('views', function buildHTML() {
  return gulp.src(config.views.demo)
    .pipe(pug())
    .pipe(gulp.dest(config.views.dest));
});

gulp.task('styles', function () {
  return gulp.src(config.styles.demo)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.styles.dest));
});

gulp.task('watch', ['clean', 'views', 'styles'], function(){
  gulp.watch(config.views.src, ['views']);
  gulp.watch(config.styles.src, ['styles']);

  gulp.watch(config.views.demo, ['views']);
  gulp.watch(config.styles.demo, ['styles']);
});

gulp.task('default', function() {

});
