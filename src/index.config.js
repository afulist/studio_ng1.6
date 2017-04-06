angular
  .module('app')
  .config(config);

/** @ngInject */
function config($logProvider, $mdThemingProvider, ezfbProvider) {
  // ===env log===
  /* @if ENV='dev' */
  $logProvider.debugEnabled(true);
  /* @endif */
  /* @if ENV='stage' **
  $logProvider.debugEnabled(true);
  /* @endif */
  /* @if ENV='prod' **
  $logProvider.debugEnabled(false);
  /* @endif */

  // ==Set options third-party lib==
  // facebook config
  ezfbProvider.setLocale('zh_TW');
  ezfbProvider.setInitParams({
    /* @if ENV='dev' */
    appId: '1075558685821425',
    /* @endif */
    /* @if ENV='stage' **
    appId: '1075559409154686',
    /* @endif */
    /* @if ENV='prod' **
    appId: '1075557892488171',
    /* @endif */
    version: 'v2.5' // default is 'v2.4'
  });

  // angular material config // .dark();
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '400', // by default use shade 500 from the pink palette for primary intentions
      'hue-1': '300', // use shade 300 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 800 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .accentPalette('green', {
      'default': 'A200', // by default use shade A200 from the pink palette for primary intentions
      'hue-1': 'A100', // use shade A100 for the <code>md-hue-1</code> class
      'hue-2': 'A400', // use shade A400 for the <code>md-hue-2</code> class
      'hue-3': 'A700' // use shade A700 for the <code>md-hue-3</code> class
    })
    .warnPalette('red', {
      'default': '500', // by default use shade 500 from the pink palette for primary intentions
      'hue-1': '300', // use shade 300 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 800 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .backgroundPalette('grey');
}
