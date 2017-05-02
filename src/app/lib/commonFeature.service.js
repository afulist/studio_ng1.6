angular
  .module('lib')
  .factory('commonFeature', commonFeature);

/** @ngInject */
function commonFeature($window) {
  var ie;
  var ua = $window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  // trident as IE11
  if (msie > 0 || Boolean(navigator.userAgent.match(/Trident.*rv\:11\./))) {  // eslint-disable-line
    ie = true;
  } else {
    ie = false;
  }
  return {
    ie: ie
  };
}
