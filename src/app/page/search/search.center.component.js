angular
  .module('search')
  .component('searchCenter', {
    templateUrl: 'app/page/search/search-center.html',
    controller: SearchCenterController
  });

/** @ngInject */
function SearchCenterController($log, $timeout, $state) {
  var vm = this;

  // ==view data==
  vm.locations = [
    {id: 1, locId: 'all', name: '全部'},
    {id: 2, locId: 'tw', name: '台灣'},
    {id: 3, locId: 'jp', name: '日本'}, {id: 6, locId: 'kr', name: '韓國韓國'}, {id: 7, locId: 'tai', name: '泰國泰國泰國'},
    {id: 5, locId: 'bb', name: 'bbbbbbbbbbbbbbbbbbbbbbbb111'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}, {id: 4, locId: 'aa', name: 'aaaaaaaaaaaaa'}
  ];
  vm.searchText = '';
  vm.selectedLoc = vm.locations[1];
  vm.suggsetionKeyword = loadSuggsetion();

  // ==view func==
  vm.querySuggsetion = querySuggsetion;
  vm.selectedItemChange = selectedItemChange;

  // ==init func==
  vm.$onInit = function () {
    // do nothing
  };

  // ==all func==
  // get keyword suggestion
  function loadSuggsetion() {
    var allStates = 'Alaskaaa, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, 中文, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';
    return allStates.split(/, +/g).map(function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }

  // search suggsetion autocomplete
  function querySuggsetion(query) {
    var result = query ? vm.suggsetionKeyword.filter(createFilterFor(query)) : vm.suggsetionKeyword;
    if (query) {
      // add current searchText on everytime query
      result.unshift({
        value: vm.searchText,
        display: vm.searchText,
        type: 'currentText'
      });
    }
    return result;
  }

  // Internal filter
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }

  // search keyword on selected
  function selectedItemChange(item) {
    if (item) { // prevent backspace trigger search
      $log.debug('Item changed to ', item, 'with ', vm.selectedLoc.name);
      // scroll to top
      // document.getElementById('top').scrollIntoView(true); // eslint-disable-line
      // delay to blur input for routing change to prev page
      var input = document.getElementsByTagName('md-autocomplete')[0].children[0].children[0]; // eslint-disable-line
      $timeout(function () {
        if (input) {
          input.blur(); // eslint-disable-line
        }
        // TODO-search: storing keyword
        // change page
        $state.go('result', {locId: vm.selectedLoc.locId, keyword: item.value});
      }, 150);
    }
  }
}
