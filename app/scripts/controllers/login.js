'use strict';

angular.module('splatToolsApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        $window.location.href = '/auth/twitter';
      }
    };
  });