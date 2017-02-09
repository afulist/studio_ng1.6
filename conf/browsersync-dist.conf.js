const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ]
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
