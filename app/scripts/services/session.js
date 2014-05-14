'use strict';

angular.module('splatToolsApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
