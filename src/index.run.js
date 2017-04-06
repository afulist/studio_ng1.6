angular
  .module('app')
  .run(runBlock);

/** @ngInject */
function runBlock($log, $trace, $transitions) {
  // $templateCache is set by gulp

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

  // demo ui-router transitions // to: 'home'
  $transitions.onStart({}, function (trans) {
    // get service
    var routerTran = trans.injector().get('routerTran');
    routerTran.transitionStart(); // on start execution
    // if (false) {
    //   // go to state
    //   return trans.router.stateService.target('login');
    // }
    trans.promise.finally(routerTran.transitionEnd); // on finish execution
  });
}

