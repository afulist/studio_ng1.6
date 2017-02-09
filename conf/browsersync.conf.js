const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    // CUSTOM: favor setting
    open: !true,
    notify: {
      styles: {
          top: 'auto',
          bottom: '0',
          right: 'auto',
          left: '0'
      }
    }
  };
};
