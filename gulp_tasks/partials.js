const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const angularTemplatecache = require('gulp-angular-templatecache');

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

gulp.task('partials', partials);

function partials() {
  // CUSTOM: show env
  console.log('[[task partials for build in ' + env + ']]');

  return gulp.src(conf.path.src('app/**/*.html'))
    .pipe(preprocess({context: { ENV: env }})) // CUSTOM: To set environment variables in-line
    .pipe(htmlmin(conf.htmlmin))
    .pipe(angularTemplatecache('templateCacheHtml.js', {
      module: conf.ngModule,
      root: 'app'
    }))
    .pipe(gulp.dest(conf.path.tmp()));
}
