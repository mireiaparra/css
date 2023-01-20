const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');

gulp.task('sass', done => {
   gulp.src('./styles/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));
      done();
  });

  gulp.task('css', done => {
    gulp.src('./css/*.css')
      .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/'));
      done();
  });

  gulp.task('run', gulp.series(['sass', 'css'], done => {
    console.log("HTTP Server Started");
    done();
  }));

  gulp.task('watch',  done => {
    gulp.watch('./styles/*.scss', gulp.series('sass'));
    gulp.watch('./css/*.css', gulp.series('css'));
    done();
  });

  gulp.task('default', gulp.series(['run', 'watch'], done => done()));