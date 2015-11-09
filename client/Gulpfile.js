var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');

gulp.task('jade', function() {

  gulp.src('./views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/')
  )

});

gulp.task('less', function () {
  return gulp.src('./styles/index.less')
    .pipe(less({
      paths: ["./styles/"]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./styles/', ['less']);
});