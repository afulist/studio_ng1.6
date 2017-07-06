angular
  .module('app')
  .run(runBlock);

/** @ngInject */
function runBlock($log, $trace, $transitions, firebase) {
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

  // ===demo===
  // ui-router transitions // to: 'home'
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

  // ===auth===
  // TODO-test: get return data after success login with fb
  firebase.auth().getRedirectResult().then(function (result) {
    var token;
    var profile;
    var user;
    if (result.credential) {
      token = result.credential.accessToken; // Facebook Access Token to access the Facebook API.
    }
    if (result.additionalUserInfo) {
      profile = result.additionalUserInfo.profile;
    }
    if (result.user) {
      user = result.user;
    }
    $log.log(token);
    $log.log(profile);
    $log.log(user);
  }).catch(function (error) {
    $log.debug(error);
  });

  // TODO-test: global login status check
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $log.log(user);
    } else {
      $log.debug('no sign user');
    }
  });
}

