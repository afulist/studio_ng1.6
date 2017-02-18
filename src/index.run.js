angular
  .module('app')
  .run(runBlock);

/** @ngInject */
function runBlock($log, $trace, $transitions) {
  // ===env===
  // console log config
  /* @if ENV='dev' */
  $log.debug('dev');
  $trace.enable('TRANSITION');
  /* @endif */
  /* @if ENV='stage' **
  $log.debug('stage');
  $trace.enable('TRANSITION');
  /* @endif */
  /* @if ENV='prod' **
  $log.debug('prod');
  $trace.disable('TRANSITION');
  /* @endif */

  // demo ui-router transitions
  $transitions.onStart({to: 'app'}, function (trans) {
    // get service
    var routerTran = trans.injector().get('routerTran');
    // on start execution
    routerTran.transitionStart();
    if (trans === null) {
      // go to state
      return trans.router.stateService.target('login');
    }
    // on finish execution
    trans.promise.finally(routerTran.transitionEnd);
  });
}

