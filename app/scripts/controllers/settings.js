'use strict';

angular.module('splatToolsApp')
  .controller('SettingsCtrl', function ($scope,$window ) {
    $scope.errors = {};

        $scope.authoriseDropbox = function(form) {
            $scope.submitted = true;

            if(form.$valid) {
                $window.location.href = 'api/dropbox/authorise';
            }
		};
  });
