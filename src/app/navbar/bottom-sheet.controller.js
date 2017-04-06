(function () {
  'use strict';

  angular
    .module('navbar')
    .controller('BottomSheetController', BottomSheetController);

  /** @ngInject */
  function BottomSheetController($log, $mdBottomSheet, $state) {
    var vm = this;

    // ==view data==
    vm.currentPage = null;

    // ==view func==
    vm.listItemClick = listItemClick;

    // ==init func==
    init();

    // ==all func==
    // init
    function init() {
      // get state name
      if ($state.includes('home')) {
        vm.currentPage = 'home';
      } else if ($state.includes('myplan')) {
        vm.currentPage = 'myplan';
      } else if ($state.includes('myfavor')) {
        vm.currentPage = 'myfavor';
      } else if ($state.includes('more')) {
        vm.currentPage = 'more';
      } else if ($state.includes('search') || $state.includes('*.result.*')) {
        vm.currentPage = 'search';
      }
    }

    // click nav item
    function listItemClick(item) {
      // close sheet
      $log.debug('listItemClick');
      $mdBottomSheet.hide(item);
      // after state change, scroll to top has bug if no $timeout here
      // $timeout(function function_name(argument) { // eslint-disable-line
      //   document.getElementById('top').scrollIntoView(true); // eslint-disable-line
      // }, 150);
    }
  }
})();

