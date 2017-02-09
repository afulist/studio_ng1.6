const gulp = require('gulp');
const eslint = require('gulp-eslint');

const conf = require('../conf/gulp.conf');

// CUSTOM: gulp-preprocess
var preprocess = require('gulp-preprocess');
// get argv from cmd
var args = process.argv.slice(3);
var env = 'dev'; // default value
// set env for gulp-preprocess
if (args[0] && args[0] === "--env=prod") {
  env = 'prod';
} else if (args[0] && args[0] === "--env=stage") {
  env = 'stage';
} else {
  // default value
}

gulp.task('scripts', scripts);

function scripts() {
  // CUSTOM: show env
  console.log('[[task scripts in ' + env + ']]');

  return gulp.src(conf.path.src('**/*.js'))
    .pipe(preprocess({context: { ENV: env }})) // CUSTOM: To set environment variables in-line
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest(conf.path.tmp()));
}
