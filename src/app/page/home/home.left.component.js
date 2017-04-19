angular
  .module('home')
  .component('homeLeft', {
    templateUrl: 'app/page/home/home-left.html',
    controller: HomeLeftController
  });

/** @ngInject */
function HomeLeftController($log, $mdSidenav) {
  var vm = this;

  // ==view data==
  vm.locations = [
    {locId: 0, name: '台灣', img: 'img/100-0.jpeg', newMessage: true},
    {locId: 1, name: '日本', img: 'img/100-0.jpeg', newMessage: true},
    {locId: 2, name: '韓國', img: 'img/100-1.jpeg', newMessage: false},
    {locId: 3, name: '泰國', img: 'img/100-2.jpeg', newMessage: false}
  ];

  // ==view func==
  vm.selectLoc = selectLoc;
  vm.test = test;

  // ==init func==
  vm.$onInit = function () {

  };

  // close Sidenav without click locking
  function selectLoc(loc, menuId) {
    if (loc === '最新') {
      // change source
      loc = {locId: 0, name: '最新', img: 'img/100-0.jpeg', newMessage: true};
    }
    // scroll to top
    document.getElementById('top').scrollIntoView(true); // eslint-disable-line
    // close nav
    if (menuId) {
      $mdSidenav(menuId).close();
    }
    // TODO-selectLoc: broadcast to load plans
    // $rootScope.$broadcast('selectLoc', {loc: loc});
  }

  // test
  function test() {
    $log.debug('test');
  }
}
