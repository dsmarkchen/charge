'use strict';

/**
 * @ngdoc function
 * @name chargeApp.controller:TxCtrl
 * @description
 * # TxCtrl
 * Controller of the chargeApp
 */
angular.module('chargeApp')
  .controller('ChargeCtrl', function ($http, $scope, $q, ivService, fileReader) {

    var stat = {
        Atk: 112,
        Def: 152,
        Hp: 225
    };
    var iv = {
        Atk: 7,
        Def: 14,
        Hp: 13
    };
    var cp =   ivService.calculateCP(40, iv, stat);

    console.log("expect 1477: " + cp );


     
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
   $scope.fasts = [];
   $scope.charges = [];
   $scope.notes = [];
   $scope.team = [];
   $scope.notes_table = [];
   $scope.team_table = [];


   $scope.buildone = function(notes, item, index) {
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

  $scope.getAlerts = function() { 
       var url = '/notes_' + $scope.opt +  '.txt';
       var url2 = 'https://dsmarkchen.github.io/charge/notes_'  + $scope.opt + '.txt';
       var prom = $http.get(url).then(function (rsp) {
            $scope.rawnotes = rsp.data.split(/\r?\n/) ;
            $scope.notes = [];
            for(var i = 0; i < $scope.rawnotes.length; i++) {
               $scope.buildone($scope.notes, $scope.rawnotes[i], i);
            } 

            localStorage.setItem("myComments", JSON.stringify($scope.notes));
    
            $scope.comments = JSON.parse(localStorage.getItem("myComments")) || []; 
            console.log("getAlerts" +$scope.notes.length);
        
        });
        return prom;
    }



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
    var v1 =  $scope.getFasts();
    var v2 = $scope.getCharges();
    $q.all([v1, v2]).then(function(result) 
        {
            console.log("both promises have resolved", result);
            var t1 = $scope.getTeam();
            var t2 = $scope.getAlerts();
            $q.all([t1, t2]).then(function(res){
                console.log("both promises (team and alerts) have resolved", res);
                $scope.build_alerts();
                $scope.build_team();
            });
            

        });
 };
 $scope.build_alerts = function() {
    $scope.notes_table = $scope.buildTable($scope.notes);

 };
  $scope.build_team = function() {
    $scope.team_table= $scope.buildTable($scope.team);

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
     var url = '/team_' + $scope.opt + '.txt';
     var url2 = 'https://dsmarkchen.github.io/charge/team_' + $scope.opt + '.txt';
     var prom =  $http.get(url).then(function (rsp) {
        $scope.rawteam = rsp.data.split(/\r?\n/) ;
        $scope.team = [] ;
        for(var i = 0; i < $scope.rawteam.length; i++) {
           $scope.buildone($scope.team, $scope.rawteam[i], i);
        } 

        localStorage.setItem("myTeam", JSON.stringify($scope.team));
        $scope.team = JSON.parse(localStorage.getItem("myTeam")) || []; 


        console.log("getTeam " +$scope.team.length);
     });
     return prom;

  };

  $scope.getCharges = function() {

   var url = '/charge.txt';
   var url2 = 'https://dsmarkchen.github.io/charge/charge.txt';
   var promise = $http.get(url).then(function (rsp) {
        $scope.charges= rsp.data.split(/\r?\n/) ;
        localStorage.setItem("myCharges", JSON.stringify($scope.charges));

        $scope.charges= JSON.parse(localStorage.getItem("myCharges")) || []; 
    });
    return promise;


  };

   $scope.getCharges();
   $scope.checkCharge= function() {
    for(var i = 0; i < $scope.charges.length; i++) {
        var data = $scope.charges[i];
        var exp = new RegExp("^"  +  $scope.move_charge);
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2"); 
            var power = data.replace(exp2, "$3"); 
            $scope.c_energy = energy;
            $scope.c_power = power;
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
            var exp2 = /(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2"); 
            var power = data.replace(exp2, "$3"); 
            var res = {
                name: charge,
                energy: parseInt(energy),
                power: parseInt(power)
             };
            return res;
        }
    } 
    return [];
 }



  $scope.getFasts = function() {

   var url = '/fast.txt';
   var url2 = 'https://dsmarkchen.github.io/charge/fast.txt';
   var prom =  $http.get(url).then(function (rsp) {
        var usingBreaker = true; 
        $scope.fasts = rsp.data.split(/\r?\n/) ;
        localStorage.setItem("myFasts", JSON.stringify($scope.fasts));

        $scope.fasts= JSON.parse(localStorage.getItem("myFasts")) || []; 
    });
    return prom;


  };
 
  $scope.checkFast = function() {
    for(var i = 0; i < $scope.fasts.length; i++) {
        var data = $scope.fasts[i];
        var exp = new RegExp("^"  +  $scope.move_fast );
        var match = data.match(exp);
        if(match) {
            var exp2 = /(.*),(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2").trim(); 
            var turn = data.replace(exp2, "$3").trim() ;
            var power = data.replace(exp2, "$4").trim() ;
            $scope.f_energy = energy;
            $scope.f_turn = turn;
            $scope.f_power = power;
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
            var exp2 = /(.*),(.*),(.*),(.*)/;
            var energy = data.replace(exp2, "$2").trim(); 
            var turn = data.replace(exp2, "$3").trim() ;
            var power = data.replace(exp2, "$4").trim() ;

            res = {
             name: fast,
             energy: parseInt(energy),
             turn: parseInt(turn),
             power: parseInt(power)
            };
            return res;
        }
    }
    return res;

 }    

  $scope.build(); 

  $scope.getFile = function () {

        fileReader.readAsText($scope.file, $scope)
                      .then(function(rsp) {

                        $scope.rawteam = rsp.split(/\r?\n/) ;
                        $scope.team = [] ;
                        for(var i = 0; i < $scope.rawteam.length; i++) {
                               $scope.buildone($scope.team, $scope.rawteam[i], i);
                        } 

                        localStorage.setItem("myTeam", JSON.stringify($scope.team));
                        $scope.team = JSON.parse(localStorage.getItem("myTeam")) || []; 
                        $scope.build_team();


                        console.log("getTeam " +$scope.team.length);
 
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
