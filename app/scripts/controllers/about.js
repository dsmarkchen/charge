'use strict';

/**
 * @ngdoc function
 * @name chargeApp.controller:TxCtrl
 * @description
 * # TxCtrl
 * Controller of the chargeApp
 */
angular.module('chargeApp')
  .controller('AboutCtrl', function ($scope, ivService, fileReader) {

   $scope.isNullOrEmpty = function (value) {
        return value == null || value === "";
   }
   $scope.calcCP = function () {
        var name = $scope.name
        var atk = $scope.attack;
        var def = $scope.defense;
        var hp = $scope.hp;
        var statProm = ivService.getStat(name);
        
        var level = parseInt($scope.level); 
        var iv = {
            Atk: parseInt(atk),
            Def: parseInt(def),
            Hp: parseInt(hp)
        }
        var stat = {
            Atk: 112,
            Def: 152,
            Hp: 225
        }
        $scope.cp = ivService.calculateCP(level, iv, stat);
   }

  })
;
