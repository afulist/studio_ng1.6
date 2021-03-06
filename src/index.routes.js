angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/home/new');

  $stateProvider

  .state('home', {
    url: '/home/{locId}',
    params: { // default params
      locId: 'new'
    },
    component: 'home',
    resolve: {
    }
  })

  .state('home-trip', {
    url: '/home/{locId}/{trip}',
    params: { // default params
      locId: 'new'
    },
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
    url: '/result/{locId}/{keyword}',
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
