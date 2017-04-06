angular
  .module('lib')
  .factory('routerTran', routerTran);

/** @ngInject */
function routerTran($timeout, $mdMedia, $log) {
  return {
    transitionStart: function () {
      $log.debug('transitionStart');
    },
    transitionEnd: function () {
      // // TODO-migrate: auto scroll
      // var delay = ($mdMedia('gt-md') || $mdMedia('md')) ? 0 : 300;
      // // scroll to top has bug if no $timeout here
      // $timeout(function () { // eslint-disable-line
      //   document.getElementById('top').scrollIntoView(true); // eslint-disable-line
      // }, delay);
      $log.debug('transitionEnd');
    }
  };
}
