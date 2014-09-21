'use strict';

angular.module('splatToolsApp')
  .controller('SignupCtrl', function ($scope, $location, $window, Auth) {
    $scope.user = {};
    $scope.registeredUser= {};
    $scope.errors = {};
    $scope.registrationStep =1;

    //call back after twitter authentication, we now need to collect additional details
    if ($location.search().twitterAuth !=null)
    {
        $scope.registrationStep =2;

        // TO DO check if this is the cleanest way to refernce a service from a controller, it looks hackey
        Auth.currentUser().then(function(data) {
            $scope.registeredUser.Name = data.displayName;
                });
    }

    $scope.registerTwitter = function(){
        $window.location.href = '/auth/twitter';
    };

    $scope.registerDropBox = function(){
            $window.location.href = '/dropbox/authorise';
    };

  });