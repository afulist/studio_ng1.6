angular
  .module('home')
  .component('homeCenter', {
    templateUrl: 'app/page/home/home-center.html',
    controller: HomeCenterController
  });

/** @ngInject */
function HomeCenterController($log, $state, mobileFeature) {
  var vm = this;

  // ==view data==
  vm.ios = mobileFeature.ios;
  var url = 'https://material.angularjs.org/1.0.6/img/list/60.jpeg';
  vm.userImage = {'background-image': 'url(' + url + ')'};
  vm.plansSort = [
    {id: 1, name: '看最新'},
    {id: 2, name: '看最多讚'},
    {id: 3, name: '看最多收藏'},
    {id: 4, name: '看最多天'},
    {id: 5, name: '看最少天'}
    // { id: 1, name: '最多留言最前'}
  ];
  vm.selectedSort = 1;
  vm.loc = getLocName($state.params.locId);

  // ==init func==
  vm.$onInit = function () {
    // TODO-load: on event to load plans
  };

  // ==all func==
  function getLocName(locId) {
    if (locId === 'new') {
      return '最新';
    } else if (locId === 'tw') {
      return '台灣';
    } else if (locId === 'jp') {
      return '日本';
    } else if (locId === 'kr') {
      return '韓國';
    } else if (locId === 'tai') {
      return '泰國';
    } else if (locId) {
      return '最新';
    }
  }
}
