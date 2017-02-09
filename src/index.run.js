angular
  .module('app')
  .run(runBlock);

/** @ngInject */
function runBlock($log) {
  // ===env===
  // console log config
  /* @if ENV='dev' */
  $log.debug('dev');
  /* @endif */
  /* @if ENV='stage' **
  $log.debug('stage');
  /* @endif */
  /* @if ENV='prod' **
  $log.debug('prod');
  /* @endif */
}
