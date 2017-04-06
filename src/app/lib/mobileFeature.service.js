angular
  .module('lib')
  .factory('mobileFeature', mobileFeature);

/** @ngInject */
function mobileFeature() {
  var ios = Boolean(navigator.userAgent.match(/(iPad|iPhone|iPod)/i));
  return {
    ios: ios,
    title: '',
    optLeftName: '',
    prevState: '',
    optRightName: ''
  };
  // function getplans(locObj) {
  //   this.loadLoc = locObj;
  //   return null;
  // }
}
