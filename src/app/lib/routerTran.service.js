angular
  .module('lib')
  .factory('routerTran', routerTran);

/** @ngInject */
function routerTran($log) {
  return {
    transitionStart: function () {
      $log.debug('transitionStart');
    },
    transitionEnd: function () {
      $log.debug('transitionEnd');
    }
  };
}
