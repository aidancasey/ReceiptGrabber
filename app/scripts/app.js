'use strict';

angular.module('splatToolsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngQuickDate',
  'angularFileUpload'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/expense',
        controller: 'ExpenseController',
        authenticate :true
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl' ,
        authenticate : false
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl',
        authenticate : false
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.authenticate){
          if (!Auth.isLoggedIn()) {
              $location.path('/login');
          }
      }
    });
  });