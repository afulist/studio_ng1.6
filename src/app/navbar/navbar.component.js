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
function NavbarController($transitions, $log, $mdSidenav, $mdBottomSheet, $state, $timeout, firebase) {
  var vm = this;

  // ==view data==
  vm.lockClick = false;
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
  vm.toggleSidenav = toggleSidenav;
  vm.navBack = navBack;
  vm.showBottomSheet = showBottomSheet;
  vm.querySuggsetion = querySuggsetion;
  vm.selectedItemChange = selectedItemChange;
  vm.login = login;
  vm.logout = logout;

  // ==init func==
  vm.$onInit = function () {
    // set selectedLoc in result state for md-select
    if ($state.current.name === 'result') {
      vm.searchText = $state.params.keyword;
      angular.forEach(vm.locations, function (item) {
        if (item.locId.toString() === $state.params.locId) {
          vm.selectedLoc = item;
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
    }).then(function (selectState) {
      // change page
      $timeout(function () {
        if (selectState === 'more') {
          $state.go(selectState, {user: 123});
        } else {
          $state.go(selectState);
        }
      }, 250);
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

  // TODO-test: login with fb
  function login() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.setCustomParameters({ // eslint-disable-line
      'locale': 'zh_TW'
    });
    firebase.auth().signInWithRedirect(provider);
  }

  // TODO-test: logout with fb
  function logout() {
    firebase.auth().signOut().then(function () {
      $log.debug('Sign-out successful.');
    }).catch(function (error) {
      $log.debug('An error happened.' + error);
    });
  }
}
