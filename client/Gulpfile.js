var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('jade', function() {

  gulp.src('./views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/')
  )

});

gulp.task('watch', function() {
  gulp.watch('./views/', ['jade']);
});