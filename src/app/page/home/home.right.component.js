angular
  .module('home')
  .component('homeRight', {
    templateUrl: 'app/page/home/home-right.html',
    controller: HomeRightController
  });

/** @ngInject */
function HomeRightController($log, $state, $window, $element, $timeout, $mdMedia, commonFeature) {
  var vm = this;

  // ==view data==
  vm.pluginOn = false;

  // ==view func==

  // ==init func==
  vm.$onInit = function () {
    // fix fb css bug by closing fb page plugin in desktop
    if ($mdMedia('gt-md') || $mdMedia('md')) {
      vm.pluginOn = true;
      // fix fb div disappear
      $timeout(function () {
        var sheet = $window.document.styleSheets[0];
        if (!commonFeature.ie) {
          sheet.insertRule('.fb_iframe_widget iframe, .fb_iframe_widget span { height: 600px !important;width: ' + ($element[0].offsetWidth - 17) + 'px !important; }', sheet.cssRules.length);
        } else if (commonFeature.ie) {
          sheet.addRule('.fb_iframe_widget iframe', 'height: 600px !important;width: ' + ($element[0].offsetWidth - 17) + 'px !important;', -1);
          sheet.addRule('.fb_iframe_widget span', 'height: 600px !important;width: ' + ($element[0].offsetWidth - 17) + 'px !important;', -1);
        }
      }, 10);
    }
  };

  // ==all func==
}
