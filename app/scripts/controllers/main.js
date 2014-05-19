'use strict';

angular.module('splatToolsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.currencyCodes = [{ name: 'EURO', id: 0 }, { name: 'AUD', id: 1 }, { name: 'GBP', id: 2 },{ name: 'AED', id: 3 }];
  });




