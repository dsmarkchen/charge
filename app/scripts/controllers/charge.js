'use strict';

/**
 * @ngdoc function
 * @name chargeApp.controller:TxCtrl
 * @description
 * # TxCtrl
 * Controller of the chargeApp
 */
angular.module('chargeApp')
  .controller('ChargeCtrl', function ($http, $scope, fileReader) {
     
    $scope.opt = localStorage.getItem("myOpt");
    if($scope.opt == null){
         $scope.opt = "great";
         localStorage.setItem("myOpt", $scope.opt);
   }


   $scope.change = function() {
      localStorage.setItem("myOpt", $scope.opt);
   }

   $scope.isNullOrEmpty = function (value) {
        return value == null || value === "";
   }
   var conto;
   $scope.notes = [];
   $scope.team = [];


   $scope.buildone = function(notes, item, index, useBreaker) {
      var withBreaker = ' ';
      if(useBreaker) {
            withBreaker='<br>';
      }
      var name ;
      var line;
      var text;
      var counter;
      if(item.trim().length > 0) {
            var exp = /^##/;
            item = item.replace(/‘/g, '&apos;');
            if (exp.test(item)) {
                conto = item.replace(/^## /, "");
            }
            var exp2 = /(.*),(.*),(.*)/;
            if(exp2.test(item)) {
                var key = item.match(exp2);
                var line = item.match(/^.*,/);
                var res = item.replace(exp2, "$1").trim();
                var res2 = item.replace(exp2, "$2").trim();
                var res3 = item.replace(exp2, "$3").trim();
                
                notes.push( {
                    name: conto,
                    fast: res,
                    charge: res2,
                    charge2: res3
                })
            }
            
     }     
        
    };
 
   var url = '/notes_' + $scope.opt +  '.txt';
   var url2 = 'https://dsmarkchen.github.io/charge/notes_'  + $scope.opt + '.txt';
   $http.get(url).then(function (rsp) {
        var usingBreaker = true; 
        $scope.rawnotes = rsp.data.split(/\r?\n/) ;
        for(var i = 0; i < $scope.rawnotes.length; i++) {
           $scope.buildone($scope.notes, $scope.rawnotes[i], i, usingBreaker);
        } 

        localStorage.setItem("myComments", JSON.stringify($scope.notes));

        $scope.comments = JSON.parse(localStorage.getItem("myComments")) || []; 
    });



   $scope.comments = null; //JSON.parse(localStorage.getItem("myComments")) || [];
   if($scope.isNullOrEmpty($scope.comments)) {
        $scope.comments = [

        ];

        localStorage.setItem("myComments", JSON.stringify($scope.notes));
    }
   $scope.comments = JSON.parse(localStorage.getItem("myComments")) || [];



    $scope.visible = false;

    $scope.parseFasts= function(s,sep) {
            // http://stackoverflow.com/questions/1155678/javascript-string-newline-character
            var universalNewline = /\r\n|\r|\n/g;
            var a = s.split(universalNewline);
            for(var i in a){
                for (var f = a[i].split(sep = sep || ","), x = f.length - 1, tl; x >= 0; x--) {
                    if (f[x].replace(/"\s+$/, '"').charAt(f[x].length - 1) == '"') {
                        if ((tl = f[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                            f[x] = f[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                          } else if (x) {
                        f.splice(x - 1, 2, [f[x - 1], f[x]].join(sep));
                      } else { 
                        f = f.shift().split(sep).concat(f);
                      }
                    } else {
                        f[x].replace(/""/g, '"');
                    }

                  } a[i] = f;
        }
        return a;
   };

    $scope.parseCSV = function(s,sep) {
            // http://stackoverflow.com/questions/1155678/javascript-string-newline-character
            var universalNewline = /\r\n|\r|\n/g;
            var a = s.split(universalNewline);
            for(var i in a){
                for (var f = a[i].split(sep = sep || ","), x = f.length - 1, tl; x >= 0; x--) {
                    if (f[x].replace(/"\s+$/, '"').charAt(f[x].length - 1) == '"') {
                        if ((tl = f[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                            f[x] = f[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                          } else if (x) {
                        f.splice(x - 1, 2, [f[x - 1], f[x]].join(sep));
                      } else { 
                        f = f.shift().split(sep).concat(f);
                      }
                    } else {
                        f[x].replace(/""/g, '"');
                    }

                  } a[i] = f;
        }
        return a;
   };
  $scope.addComment = function() {
    var data = { 
        conto: $scope.addConto, 
        line:$scope.addLine,
        name: $scope.addName,
        comment: $scope.addNote
    };
    $scope.comments.push(data);  
  }   

  $scope.checkPokemon = function() {
    for(var i = 0; i < $scope.notes.length; i++) {
        var data = $scope.notes[i];
        if(data.name.match($scope.pokemon)) { 
            
            $scope.p_fast = data.fast;
            $scope.p_charge= data.charge;
            $scope.p_charge2= data.charge2;
            $scope.move_fast = $scope.p_fast;
            var f = $scope.getFast(data.fast);
            var c = $scope.getCharge(data.charge);
            var c2 = $scope.getCharge(data.charge2);
            $scope.p_fast_energy = f.energy;
            $scope.p_charge_count = Math.ceil(c.energy / f.energy);
            $scope.p_charge2_count = Math.ceil(c2.energy / f.energy);
            return;
        }
    } 

 }

  $scope.getPokemon = function(pokemon) {
    for(var i = 0; i < $scope.notes.length; i++) {
        var data = $scope.notes[i];
        if(data.name.match(pokemon)) { 
            
            var p_fast = data.fast;
            var p_charge= data.charge;
            var p_charge2= data.charge2;
            var move_fast = p_fast;
            var f = $scope.getFast(data.fast);
            var c = $scope.getCharge(data.charge);
            var c2 = $scope.getCharge(data.charge2);
            var p_fast_energy = f.energy;
            var p_charge_count = Math.ceil(c.energy / f.energy);
            var p_charge2_count = Math.ceil(c2.energy / f.energy);
            var data = {
                name: pokemon,
                fast: data.fast,
                charge: data.charge,
                charg2: data.charge2,
                energy: p_fast_energy,
                count: p_charge_count,
                count2: p_charge2_count 
            }    
            return data;
        }

        
    } 
    return [];

 }
 $scope.build = function() {
    $scope.notes_table = $scope.buildTable($scope.notes);

 };

 $scope.buildTable = function(notes) {
    var lst = [];
    for(var i = 0; i < notes.length; i++) {
        var data = notes[i];
            
            var p_fast = data.fast;
            var p_charge= data.charge;
            var p_charge2= data.charge2;
            var move_fast = p_fast;
            var f = $scope.getFast(data.fast);
            var c = $scope.getCharge(data.charge);
            var c2 = $scope.getCharge(data.charge2);
            var p_fast_energy = f.energy;
            var p_charge_count = Math.ceil(c.energy / f.energy);
            var p_charge2_count = Math.ceil(c2.energy / f.energy);
            var res = {
                name: data.name,
                fast: data.fast,
                charge: data.charge,
                charge2: data.charge2,
                energy: p_fast_energy,
                count: p_charge_count,
                count2: p_charge2_count 
            }   
            lst.push(res); 
        

        
    } 
    return lst;
 } ;

  $scope.getTeam = function() {

     var url = '/team.txt';
     var url2 = 'https://dsmarkchen.github.io/charge/team.txt';
      $http.get(url).then(function (rsp) {
        var usingBreaker = true; 
        $scope.rawnotes = rsp.data.split(/\r?\n/) ;
        for(var i = 0; i < $scope.rawnotes.length; i++) {
           $scope.buildone($scope.team, $scope.rawnotes[i], i, usingBreaker);
        } 

        localStorage.setItem("myTeam", JSON.stringify($scope.team));
        $scope.team = JSON.parse(localStorage.getItem("myTeam")) || []; 
     });

  };
  $scope.getTeam();

  $scope.getCharges = function() {

   var url = '/charge.txt';
   var url2 = 'https://dsmarkchen.github.io/charge/charge.txt';
   $http.get(url).then(function (rsp) {
        var usingBreaker = true; 
        $scope.charges= rsp.data.split(/\r?\n/) ;
        localStorage.setItem("myCharges", JSON.stringify($scope.charges));

        $scope.charges= JSON.parse(localStorage.getItem("myCharges")) || []; 
    });



  };

   $scope.getCharges();

   $scope.checkCharge= function() {
    for(var i = 0; i < $scope.charges.length; i++) {
        var data = $scope.charges[i];
        var exp = new RegExp("^"  +  $scope.move_charge);
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*)/;
            var energy = data.replace(exp2, "$2"); 
            $scope.c_energy = energy;
            console.log(match);
        }
    } 

 }
   $scope.getCharge= function(charge) {
    for(var i = 0; i < $scope.charges.length; i++) {
        var data = $scope.charges[i];
        var exp = new RegExp("^"  +  charge);
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*)/;
            var energy = data.replace(exp2, "$2"); 
            var res = {
                name: charge,
                energy: parseInt(energy) };
            return res;
        }
    } 
    return [];
 }



  $scope.getFasts = function() {

   var url = '/fast.txt';
   var url2 = 'https://dsmarkchen.github.io/charge/fast.txt';
   $http.get(url).then(function (rsp) {
        var usingBreaker = true; 
        $scope.fasts = rsp.data.split(/\r?\n/) ;
        localStorage.setItem("myFasts", JSON.stringify($scope.fasts));

        $scope.fasts= JSON.parse(localStorage.getItem("myFasts")) || []; 
    });



  };
 
  $scope.checkFast = function() {
    for(var i = 0; i < $scope.fasts.length; i++) {
        var data = $scope.fasts[i];
        var exp = new RegExp("^"  +  $scope.move_fast );
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2").trim(); 
            var turn = data.replace(exp2, "$3").trim() ;
            $scope.f_energy = energy;
            $scope.f_turn = turn;
            console.log(match);
        }
    } 

 };

 $scope.getFast = function(fast) {
    var res = [];
    for(var i = 0; i < $scope.fasts.length; i++) {
        var data = $scope.fasts[i];
        var exp = new RegExp("^"  +  fast );
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2").trim(); 
            var turn = data.replace(exp2, "$3").trim() ;
            res = {
             name: fast,
             energy: parseInt(energy),
             turn: parseInt(turn)
            };
            return res;
        }
    }
    return res;

 }    


  $scope.getFile = function () {
        $scope.progress = 0;
        $scope.textSrc = '';
        $scope.totalSymbols = 0;    
        $scope.totalLHs = 0;

        localStorage.setItem("totalSymbols", $scope.totalSymbols);
        localStorage.setItem("totalLHs", $scope.totalLHs);

        fileReader.readAsText($scope.file, $scope)
                      .then(function(result) {
                          $scope.textSrc = result;
                          $scope.lines= $scope.parseCSV(result, ",");
                          
                          $scope.lines.forEach(function (line) { 
                             var regex = /LH/;
                             if(regex.test(line)) {
                                $scope.totalSymbols += line.length - 4;
                                $scope.totalLHs ++;
                             }
                           });
                          localStorage.setItem("totalSymbols", $scope.totalSymbols);
                          localStorage.setItem("totalLHs", $scope.totalLHs);

                          //$scope.textSrc =angular.fromJson(result);
                          console.log(typeof(result));
                          console.log(typeof($scope.textSrc));
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });
  })
  .directive("ngFileSelect",function(){

    return {
        link: function($scope,el){
      
          el.bind("change", function(e){
          
            $scope.file = (e.srcElement || e.target).files[0];
            $scope.getFile();
      
          });
      
        }
    
    }; 
   })
   .factory("fileReader", function ($q, $log) {

        $log.log("fileReader"); 

        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsText = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsText(file);
             
            return deferred.promise;
        };
 
        return {
            readAsText: readAsText  
        };
    }
)
;
