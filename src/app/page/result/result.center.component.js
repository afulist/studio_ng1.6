angular
  .module('result')
  .component('resultCenter', {
    templateUrl: 'app/page/result/result-center.html',
    controller: ResultCenterController
  });

/** @ngInject */
function ResultCenterController($log, $state, mobileFeature) {
  var vm = this;

  // ==view data==
  vm.ios = mobileFeature.ios;
  var url = 'https://material.angularjs.org/1.0.6/img/list/60.jpeg';
  vm.userImage = {'background-image': 'url(' + url + ')'};
  vm.plansSort = [
    {id: 1, name: '顯示最多100個'},
    {id: 2, name: '顯示最多200個'},
    {id: 3, name: '顯示最多300個'}
  ];
  vm.selectedSort = 1;

  // ==init func==
  vm.$onInit = function () {
    // TODO-load: on event to load plans
  };

  // ==all func==
}
