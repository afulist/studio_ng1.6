angular
  .module('techs')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    }
  });
