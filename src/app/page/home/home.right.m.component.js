angular
  .module('home')
  .component('homeRightM', {
    templateUrl: 'app/page/home/home-right-m.html',
    controller: HomeRightMController
  });

/** @ngInject */
function HomeRightMController($log, $mdSidenav) {
  var vm = this;

  // ==view data==

  // ==view func==
  vm.checkSide = checkSide;

  // ==init func==

  // ==all func==
  // fix fb css bug by closing fb page plugin in mobile
  function checkSide() {
    if ($mdSidenav('right').isOpen()) {
      return true;
    }
  }
}
