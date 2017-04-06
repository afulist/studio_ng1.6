angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
    component: 'home',
    resolve: {
    }
  })

  .state('home-trip', {
    url: '/home/{trip}',
    component: 'homeTrip',
    resolve: {
    }
  })

  .state('search', { // for mobile
    url: '/search',
    component: 'search',
    resolve: {
    }
  })

  .state('result', {
    url: '/result/{location}/{keyword}',
    component: 'result',
    resolve: {
    }
  })

  .state('myplan', {
    url: '/myplan',
    component: 'myplan',
    resolve: {
    }
  })

  .state('myplan-trip', {
    url: '/myplan/{trip}',
    component: 'planTrip',
    resolve: {
    }
  })

  .state('myplan-trip-edit', {
    url: '/myplan/{trip}/edit',
    component: 'tripEdit',
    resolve: {
    }
  })

  .state('myfavor', {
    url: '/myfavor',
    component: 'myfavor',
    resolve: {
    }
  })

  .state('myfavor-trip', {
    url: '/myfavor/{trip}',
    component: 'favorTrip',
    resolve: {
    }
  })

  .state('more', {
    url: '/more/{user}',
    component: 'more',
    resolve: {
    }
  })
  ;
}
