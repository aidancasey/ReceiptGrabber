'use strict';

angular.module('splatToolsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
 
  //set the logged in users name 
//   Auth.currentUser().then(function(data) {
//    $scope.loggedInUser = {};
  //     $scope.loggedInUser.Name = data.displayName;
  //    });

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Settings',
      'link': '/settings'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
