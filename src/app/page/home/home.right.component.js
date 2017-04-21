angular
  .module('home')
  .component('homeRight', {
    templateUrl: 'app/page/home/home-right.html',
    controller: HomeRightController
  });

/** @ngInject */
function HomeRightController($log, $state, $timeout, $mdMedia) {
  var vm = this;

  // ==view data==
  vm.pluginOn = false;

  // ==view func==

  // ==init func==
  vm.$onInit = function () {
    // fix fb css bug by closing fb page plugin in desktop
    if ($mdMedia('gt-md') || $mdMedia('md')) {
      vm.pluginOn = true;
    }
  };

  // ==all func==
}
