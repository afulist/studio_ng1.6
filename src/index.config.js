angular
  .module('app')
  .config(config);

/** @ngInject */
function config($logProvider) {
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
}
