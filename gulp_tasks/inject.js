const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const gulpInject = require('gulp-inject');

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

gulp.task('inject', inject);

function inject() {
  const injectScripts = gulp.src([
    conf.path.tmp('**/*.js'),
    `!${conf.path.tmp('**/*.spec.js')}`
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  const injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  // CUSTOM: show env
  console.log('[[task inject in ' + env + ']]');

  return gulp.src(conf.path.src('index.html'))
    .pipe(preprocess({context: { ENV: env }})) // CUSTOM: To set environment variables in-line
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}
