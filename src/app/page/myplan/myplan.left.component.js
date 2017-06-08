angular
  .module('myplan')
  .component('myplanLeft', {
    templateUrl: 'app/page/myplan/myplan-left.html',
    controller: MyplanLeftController
  });

/** @ngInject */
function MyplanLeftController($log, $mdSidenav, $state) {
  var vm = this;

  // ==view data==
  vm.locations = [
    {locId: 'tw', name: '台灣台灣台灣台灣', img: 'img/100-0.jpeg', newMessage: true},
    {locId: 'jp', name: '日本', img: 'img/100-0.jpeg', newMessage: true},
    {locId: 'kr', name: '韓國', img: 'img/100-1.jpeg', newMessage: false},
    {locId: 'tai', name: '泰國', img: 'img/100-2.jpeg', newMessage: false}
  ];

  // ==view func==
  vm.selectLoc = selectLoc;
  vm.test = test;

  // ==init func==
  vm.$onInit = function () {
    // do nothing
  };

  // close Sidenav without click locking
  function selectLoc(locId, menuId) {
    // close nav
    if (menuId) {
      $mdSidenav(menuId).close().then(function () {
        // change content by loc in mobile
        $state.go('home', {locId: locId}, {reload: true});
      });
    } else {
      // change content by loc
      $state.go('home', {locId: locId}, {reload: true});
    }
  }

  // test
  function test() {
    $log.debug('test');
  }
}
