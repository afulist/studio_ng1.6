angular
  .module('home')
  .component('homeRightM', {
    templateUrl: 'app/page/home/home-right-m.html',
    controller: HomeRightMController
  });

/** @ngInject */
function HomeRightMController($log, $window, $element, $timeout, $mdMedia, $mdSidenav, commonFeature) {
  var vm = this;

  // ==view data==

  // ==view func==
  vm.checkSide = checkSide;

  // ==init func==
  vm.$onInit = function () {
    // fix fb div disappear
    $timeout(function () {
      var fbWidth = ($mdMedia('xs')) ? '226' : '340';
      var sheet = $window.document.styleSheets[0];
      if (!commonFeature.ie) {
        sheet.insertRule('md-sidenav .fb_iframe_widget iframe, md-sidenav .fb_iframe_widget span { height: 600px !important;width: ' + fbWidth + 'px !important; }', sheet.cssRules.length);
      } else if (commonFeature.ie) {
        sheet.addRule('md-sidenav .fb_iframe_widget iframe', 'height: 600px !important;width: ' + fbWidth + 'px !important;', -1);
        sheet.addRule('md-sidenav .fb_iframe_widget span', 'height: 600px !important;width: ' + fbWidth + 'px !important;', -1);
      }
    }, 1000);
  };

  // ==all func==
  // fix fb css bug by closing fb page plugin in mobile
  function checkSide() {
    if ($mdSidenav('right').isOpen()) {
      return true;
    }
  }
}
