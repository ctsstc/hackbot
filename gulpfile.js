const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const ts = require('gulp-typescript');
const del = require('del');

const dest = './dist';
const src = './src';

gulp.task('default', gulpSequence('clean', ['typescript']));

gulp.task('clean', function() {
  return del(`${dest}`);
});

gulp.task('typescript', function() {
  return gulp.src(`${src}/**/*.ts`)
    .pipe(ts({

    }));
});