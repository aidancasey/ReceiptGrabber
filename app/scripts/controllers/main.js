'use strict';

angular.module('splatToolsApp')
  .controller('MainCtrl', function ($scope, $http) {
  	//get list of supported currencies 
    $http.get('/api/currency').success(function(currencies) {
      $scope.currencyCodes = currencies;
    });


  });




