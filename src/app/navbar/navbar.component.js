angular
  .module('navbar')
  .component('acmeNavbar', {
    templateUrl: 'app/navbar/navbar.html',
    controller: NavbarController,
    bindings: {
      logo: '@',
      titleM: '@',
      optLeftNameM: '@',
      optRightNameM: '@',
      prevState: '@'
    }
  });

/** @ngInject */
function NavbarController($transitions, $log, $mdSidenav, $mdBottomSheet, $state, $timeout) {
  var vm = this;

  // ==view data==
  vm.lockClick = false;
  vm.locations = [
    {id: 1, name: '全部'},
    {id: 2, name: '台灣'},
    {id: 3, name: '東南亞'}, {id: 6, name: '東東南亞'}, {id: 7, name: '東南亞東東'},
    {id: 5, name: 'bbbbbbbbbbbbbbbbbbbbbbbb111'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}, {id: 4, name: 'aaaaaaaaaaaaa'}
  ];
  vm.searchText = '';
  vm.selectedLoc = '台灣';
  vm.suggsetionKeyword = loadSuggsetion();

  // ==view func==
  vm.toggleSidenav = toggleSidenav;
  vm.navBack = navBack;
  vm.showBottomSheet = showBottomSheet;
  vm.querySuggsetion = querySuggsetion;
  vm.selectedItemChange = selectedItemChange;

  // ==init func==
  vm.$onInit = function () {
    // set selectedLoc in result state
    if ($state.current.name === 'result') {
      vm.searchText = $state.params.keyword;
      angular.forEach(vm.locations, function (item) {
        if (item.name.toString() === $state.params.location) {
          vm.selectedLoc = item.name;
        }
      });
    }
  };

  // ==all func==
  // open or close Sidenav exclusive with click locking
  function toggleSidenav(menuId) {
    vm.lockClick = true;
    if (menuId === 'left') {
      $mdSidenav('right').close().then(function () {
        $mdSidenav(menuId).toggle().then(function () {
          vm.lockClick = false;
        });
      });
    } else {
      $mdSidenav('left').close().then(function () {
        $mdSidenav(menuId).toggle().then(function () {
          vm.lockClick = false;
        });
      });
    }
  }

  // go back to previous page
  function navBack(prevState) {
    $state.go(prevState, {}, {reload: true}); // reload to get reslove data again
  }

  // show BottomSheet internally
  function bottomSheet() {
    $mdBottomSheet.show({
      templateUrl: 'app/navbar/bottom-sheet.html',
      controller: 'BottomSheetController',
      controllerAs: 'bvm'
    }).then(function (clickedItem) {
      $log.debug(clickedItem);
    });
  }

  // check Sidenav then show BottomSheet
  function showBottomSheet() {
    vm.lockClick = true;
    if ($mdSidenav('right').isOpen()) {
      $mdSidenav('right').close().then(function () {
        vm.lockClick = false;
        bottomSheet();
      });
    } else if ($mdSidenav('left').isOpen()) {
      $mdSidenav('left').close().then(function () {
        vm.lockClick = false;
        bottomSheet();
      });
    } else {
      vm.lockClick = false;
      bottomSheet();
    }
  }

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
      $log.debug('Item changed to ', item, 'with ', vm.selectedLoc);
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
        $state.go('result', {location: vm.selectedLoc, keyword: item.value});
      }, 150);
    }
  }
}
