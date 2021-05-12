'use strict';

/**
 * @ngdoc function
 * @name chargeApp.controller:TxCtrl
 * @description
 * # TxCtrl
 * Controller of the chargeApp
 */
angular.module('chargeApp')
  .controller('AboutCtrl', function ($scope, fileReader) {

   $scope.isNullOrEmpty = function (value) {
        return value == null || value === "";
   }


  })
;
