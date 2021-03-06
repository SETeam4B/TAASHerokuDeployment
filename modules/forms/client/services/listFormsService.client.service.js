// Forms service used to communicate Forms REST endpoints
(function () {
  'use strict';

  angular
    .module('forms')
    .factory('ListFormsService', ListFormsService);

  ListFormsService.$inject = ['$resource'];

  function ListFormsService($resource) {
    return $resource('api/listForm', {
      username: '@username'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
