angular
  .module('layout')
  .component('home', {
    templateUrl: 'app/layout/home.html',
    controller: HomeController
  });

/** @ngInject */
function HomeController() {
  var vm = this;

  // ==init func==
  vm.$onInit = function () {
  };
}
