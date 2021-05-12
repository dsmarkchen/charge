"use strict";angular.module("chargeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).directive("xwindow",["$window",function(i){return{link:function(e,t,n){function o(){console.log(i.innerWidth),e.width!==i.innerWidth&&(e.width=i.innerWidth,e.$digest()),e.height!==i.innerHeight&&(e.height=i.innerHeight,e.$digest())}e.width=i.innerWidth,e.height=i.innerHeight,angular.element(i).on("resize",o),e.$on("$destroy",function(){angular.element(i).off("resize",o)})},restrict:"A"}}]).directive("tooltip",["$compile","$sce",function(i,l){return{restrict:"A",scope:{content:"=tooltipContent"},link:function(t,e,n){t.displayTooltip=!1,t.updateTooltipOpacity=function(e){o.css({opacity:e,"max-width":340})},t.updateTooltipPosition=function(e,t){$(this);o.css({top:e+"px",left:t+"px"})},t.getSafeContent=function(e){return l.trustAsHtml(e)};var o=angular.element('<div ng-show="displayTooltip" id="tooltip">        \t<span ng-bind-html="getSafeContent(content)"></span>        </div>');angular.element('<div ng-show="displayTooltip" class="tooltip">        \t<span ng-bind-html="getSafeContent(content)"></span>        </div>');angular.element(document.querySelector("body")).append(o),e.on("mouseenter",function(e){t.displayTooltip=!0,t.$digest()}),e.on("mousemove",function(e){t.updateTooltipOpacity(.9),t.updateTooltipPosition(e.clientY-20,e.clientX+5)}),e.on("mouseleave",function(){t.displayTooltip=!1,t.$digest()}),i(o)(t)}}}]).directive("xtooltip",function(){return{restrict:"A",link:function(e,t,n){t.hover(function(){t.tooltip({html:"true",container:"body"}),t.tooltip("show")},function(){t.tooltip("hide")})}}}).directive("bs-tooltip",function(){return function(e,t,n){n.$observe("title",function(e){t.tooltip("destroy"),jQuery.trim(e)&&t.tooltip()}),t.on("$destroy",function(){t.tooltip("destroy"),delete n.$$observers.title})}}).config(["$routeProvider",function(e,t){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/charge/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/charge/main",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/charge/charge",{templateUrl:"views/charge.html",controller:"ChargeCtrl",controllerAs:"charge"}).when("/charge",{templateUrl:"views/charge.html",controller:"ChargeCtrl",controllerAs:"charge"}).when("/charge/rx",{templateUrl:"views/rx.html",controller:"RxCtrl",controllerAs:"rx"}).when("/rx",{templateUrl:"views/rx.html",controller:"RxCtrl",controllerAs:"rx"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("chargeApp").filter("split",function(){return function(e){var t=e.split(/([!,.;?-])/g),n="",o="",i="";return t.forEach(function(e){if(n+=e,52<e.length){return n.split(/(that|where|which|when|who)/g).forEach(l),o+=i,void(n="")}((o+=e).endsWith("--")&&"-"==e||"?"==e||";"==e||"."==e||"!"==e||","==e)&&(o+="\n",n="")}),console.log("line_index:0"),o;function l(e){if("that"==e||"where"==e||"when"==e||"who"==e||"which"==e)return i+="\n ",void(i+=e);i+=e}}}).controller("MainCtrl",["$window","$scope","$location",function(e,t,n){var o,i;this.test="testing mainController",t.txTotalSymbols=localStorage.getItem("totalSymbols"),t.txTotalLHs=localStorage.getItem("totalLHs"),t.rxTotalSymbols=localStorage.getItem("rxTotalSymbols"),t.rxTotalLHs=localStorage.getItem("rxTotalLHs"),t.isActive=function(e){return e===n.path()},t.ie=(o=window.navigator.userAgent,0<(i=o.indexOf("MSIE"))?parseInt(o.substring(i+5,o.indexOf(".",i))):navigator.userAgent.match(/Trident\/7\./)?11:0)}]),angular.module("chargeApp").controller("AboutCtrl",["$scope","fileReader",function(e,t){e.isNullOrEmpty=function(e){return null==e||""===e}}]),angular.module("chargeApp").directive("xelement",["$timeout",function(l){return{restrict:"A",link:function(n,o,i){o.ready(function(){var e,t;l(function(){e=o[0].offsetHeight,t=o[0].offsetWidth,i.key?n[i.key]={height:e,width:t}:n.elementSize={height:e,width:t}})})}}}]).filter("myCantoFilter",function(){return function(e,t){var n=[];if(""==t)return e;var o=t.split(/[,:]/),i=o[0],l=o[1],a=o[2];return angular.forEach(e,function(e){null!=e.name&&e.name.trim()==i.trim()&&e.line>=l&&e.line<a&&n.push(e)}),n}}).filter("conto",function(){return function(e,t){var n=[];if(""==t)return n;var o=t.split(/[,:]/),i=o[0],l=o[1],a=o[2];return angular.forEach(e,function(e){e.conto==i&&e.line>=l&&e.line<=a&&n.push(e)}),n}}).controller("RxCtrl",["$scope","$http","$filter",function(r,e,t){r.opt=localStorage.getItem("myOpt"),null==r.opt&&(r.opt="pinsky",localStorage.setItem("myOpt",r.opt)),r.isNullOrEmpty=function(e){return null==e||""===e},r.comments=JSON.parse(localStorage.getItem("myComments"))||[],r.getFilteredComments=function(){return t("conto")(r.comments,1,1,9)},r.rxTotalSymbols=60,r.rxTotalLHs=1,r.myQuery=localStorage.getItem("myQuery"),r.isNullOrEmpty(r.myQuery)&&(r.myQuery="1:1,25",localStorage.setItem("myQuery",r.myQuery)),localStorage.setItem("rxTotalSymbols",r.rxTotalSymbols),localStorage.setItem("rxTotalLHs",r.rxTotalLHs);var l=0,a=[];r.cantoes=[];var c="",n="https://dsmarkchen.github.io/charge/charge.txt";"bang"==r.opt&&(n="https://dsmarkchen.github.io/charge/chargebang.txt"),"pinsky"==r.opt&&(n="https://dsmarkchen.github.io/charge/chargepinsky.txt"),e.get(n).then(function(e){r.charge=e.data.split(/\r?\n/);for(var t=0;t<r.charge.length;t++)r.buildone(r.charge[t],t,!0);0<a.length&&r.cantoes.push({line:l-1,text:a.join("<br>")})});var s=3;r.move=function(){var e=r.myQuery;if(""!=e){var t=e.split(/[,:]/),n=t[0].trim(),o=parseInt(t[1].trim(),10),i=parseInt(t[2].trim(),10),l=i-o;if(0<s){i=i+l+1;var a=(o=o+l+1)%3;0==a&&(o+=1,i+=1),2==a&&(o-=1,i-=1)}s<0&&(o=o-l-1,i=i-l-1,0==a&&(o+=1,i+=1),2==a&&(o-=1,i-=1)),o<0&&(o=1),r.myQuery=n+":"+o.toString()+","+i.toString(),localStorage.setItem("myQuery",r.myQuery)}},r.prev=function(){s=-3,r.move()},r.next=function(){s=3,r.move()},r.buildone=function(e,t,n){var o=" ";if(n&&(o="<br>"),0<e.trim().length){if(/^##/.test(e))return 0<a.length&&(r.cantoes.push({name:c,line:l,text:a.join(o),visible:!0}),a=[]),c=e.replace(/^## /,""),void(l=0);var i=e.replace(/--/g,"&#x2012;");a.push(i.trim()),l++,3==a.length&&(r.cantoes.push({name:c,line:l-2,text:a.join(o),visible:!0}),a=[])}}}]),angular.module("chargeApp").controller("ChargeCtrl",["$http","$scope","fileReader",function(e,a,t){var r;a.opt=localStorage.getItem("myOpt"),null==a.opt&&(a.opt="pinsky",localStorage.setItem("myOpt",a.opt)),a.change=function(){localStorage.setItem("myOpt",a.opt)},a.isNullOrEmpty=function(e){return null==e||""===e},a.notes=[],a.buildone=function(e,t,n){if(n&&"<br>",0<e.trim().length){e=e.replace(/�/g,"&apos;"),/^##/.test(e)&&(r=e.replace(/^## /,""));var o=/\d+-\d+/;if(o.test(e)){var i=e.match(o),l=e.match(/^\d+/);e.replace(o,"");a.notes.push({conto:r,line:parseInt(l[0].trim(),10),name:i[0],comment:e})}}};e.get("https://dsmarkchen.github.io/charge/notes.txt").then(function(e){a.rawnotes=e.data.split(/\r?\n/);for(var t=0;t<a.rawnotes.length;t++)a.buildone(a.rawnotes[t],t,!0);localStorage.setItem("myComments",JSON.stringify(a.notes)),a.comments=JSON.parse(localStorage.getItem("myComments"))||[]}),a.comments=null,a.isNullOrEmpty(a.comments)&&(a.comments=[{conto:5,line:1,name:"1-3",comment:"1-3 descent to the second Circle: the lustful"},{conto:5,line:4,name:"4-15",comment:"4-15 proem: Minos judge of the damned"},{conto:5,line:16,name:"16-20",comment:"16-20 Minos attempts to discourage Dante"},{conto:5,line:21,name:"21-24",comment:"21-24 Virgil repeats his magical phrase (III.95-96)"},{conto:5,line:25,name:"25-30",comment:"25-30 again, impressions of sound are the first Dante has"},{conto:5,line:31,name:"31-39",comment:"31-39 the 'hellscape': weeping, darkness, storm"},{conto:5,line:40,name:"40-49",comment:"40-49 two similes: starlings and cranes"},{conto:5,line:50,name:"50-51",comment:"50-51 Dante wants to know who are punished here; Virgil:"},{conto:5,line:52,name:"52-63",comment:"52-63 Semiramis, Dido, Cleopatra"},{conto:5,line:64,name:"64-69",comment:"64-69 Helen, Achilles, Paris, Tristan, and many others"},{conto:5,line:70,name:"70-78",comment:"70-78 Dante's piteous reaction and desire to speak"},{conto:5,line:79,name:"79-81",comment:"79-81 he calls out to the pair of lovers"},{conto:5,line:82,name:"82-87",comment:"82-87 simile: doves returning to nest"},{conto:5,line:88,name:"88-108",comment:"88-108 Francesca's first speech:"},{conto:5,line:88,name:"88-96",comment:" 88-96 her kind words for Dante's kindness"},{conto:5,line:97,name:"97-99",comment:" 97-99 she is from Ravenna"},{conto:5,line:100,name:"100-108",comment:" 100-108 Love... Love... Love... : her litany of joy, woe"},{conto:5,line:109,name:"109-111",comment:" 109-111 Dante's reaction and Virgil's laconic question"},{conto:5,line:112,name:"112-120",comment:" 112-120 Dante's rumination and question to Francesca"},{conto:5,line:121,name:"121-138",comment:"121-138 Francesca's second response:"},{conto:5,line:121,name:"121-126",comment:"121-126 despite the pain it will cause, she will speak"},{conto:5,line:127,name:"127-129",comment:"127-129 she and Paolo were reading of Lancelot in love"},{conto:5,line:130,name:"130-138",comment:"130-138 enflamed by the reading, they embraced"},{conto:5,line:139,name:"139-142",comment:"139-142 coda: Francesca concludes, Paolo weeps, Dante faints"},{conto:6,line:1,name:"1-6",comment:" 1-6 Dante recovers from his syncope to find a new place"},{conto:6,line:7,name:"7-12",comment:" 7-12 the third Circle: cold downpour on stinking ground"},{conto:6,line:13,name:"13-21",comment:" 13-21 Cerberus presides, barking; he flays the sinners"},{conto:6,line:22,name:"22-27",comment:" 22-27 Cerberus's opposition and Virgil's 'sop' for him"},{conto:6,line:28,name:"28-33",comment:" 28-33 simile: dog ravenously gulping food"},{conto:6,line:34,name:"34-37",comment:" 34-37 Dante and Virgil pass over the prone shades"},{conto:6,line:38,name:"38-42",comment:" 38-42 Florence: Ciacco recognizes Dante and presents self"},{conto:6,line:43,name:"43-48",comment:" 43-48 Dante does not recognize him, transfigured by pain"},{conto:6,line:49,name:"49-57",comment:" 49-57 Ciacco identifies himself and his sin: gluttony"},{conto:6,line:58,name:"58-63",comment:" 58-63 Dante asks his views on the likely future of the city"},{conto:6,line:64,name:"64-72",comment:" 64-72 Ciacco: first the Whites, then the Blacks, will win"},{conto:6,line:73,name:"73-76",comment:" 73-76 the just are few, the sinners many"},{conto:6,line:77,name:"77-84",comment:" 77-84 Dante wants to know the afterlife of five townsmen"},{conto:6,line:85,name:"85-87",comment:" 85-87 Ciacco: all are in hell, as Dante will perhaps see"},{conto:6,line:88,name:"88-90",comment:" 88-90 Ciacco would like to be remembered to those above"},{conto:6,line:91,name:"91-93",comment:" 91-93 he returns to his hebetude"},{conto:6,line:94,name:"94-99",comment:" 94-99 Virgil: he will wake no more until the last trumpet"},{conto:6,line:100,name:"100-111",comment:" 100-111 Virgil on the increase of eternal pain for the damned"},{conto:6,line:112,name:"112-115",comment:" 112-115 they talk until they are ready to descend: Plutus"},{conto:1,line:1,name:"stray",comment:"deviate"},{conto:1,line:4,name:"savage",comment:"wild"},{conto:1,line:16,name:"ray",comment:"a narrow beam of light"},{name:"fugitive",conto:1,line:25,comment:"straying"},{name:"lithe",conto:1,line:31,comment:"flexible"},{name:"hide",conto:1,line:31,comment:"n. skin"},{conto:1,line:34,name:"impede",comment:"prevent"},{conto:1,line:34,name:"ascent",comment:"upward movement"},{conto:1,line:88,name:"shudder",comment:"tremble"},{name:"cowardice",conto:9,line:1,comment:"lack of courage to face difficulty"},{name:"pallor",conto:9,line:1,comment:"pale"}],localStorage.setItem("myComments",JSON.stringify(a.notes))),a.comments=JSON.parse(localStorage.getItem("myComments"))||[],a.visible=!1,a.parseCSV=function(e,t){var n=e.split(/\r\n|\r|\n/g);for(var o in n){for(var i,l=n[o].split(t=t||","),a=l.length-1;0<=a;a--)'"'==l[a].replace(/"\s+$/,'"').charAt(l[a].length-1)?1<(i=l[a].replace(/^\s+"/,'"')).length&&'"'==i.charAt(0)?l[a]=l[a].replace(/^\s*"|"\s*$/g,"").replace(/""/g,'"'):a?l.splice(a-1,2,[l[a-1],l[a]].join(t)):l=l.shift().split(t).concat(l):l[a].replace(/""/g,'"');n[o]=l}return n},a.addComment=function(){var e={conto:a.addConto,line:a.addLine,name:a.addName,comment:a.addNote};a.comments.push(e)},a.getFile=function(){a.progress=0,a.textSrc="",a.totalSymbols=0,a.totalLHs=0,localStorage.setItem("totalSymbols",a.totalSymbols),localStorage.setItem("totalLHs",a.totalLHs),t.readAsText(a.file,a).then(function(e){a.textSrc=e,a.lines=a.parseCSV(e,","),a.lines.forEach(function(e){/LH/.test(e)&&(a.totalSymbols+=e.length-4,a.totalLHs++)}),localStorage.setItem("totalSymbols",a.totalSymbols),localStorage.setItem("totalLHs",a.totalLHs),console.log(typeof e),console.log(typeof a.textSrc)})},a.$on("fileProgress",function(e,t){a.progress=t.loaded/t.total})}]).directive("ngFileSelect",function(){return{link:function(t,e){e.bind("change",function(e){t.file=(e.srcElement||e.target).files[0],t.getFile()})}}}).factory("fileReader",["$q","$log",function(o,e){e.log("fileReader");return{readAsText:function(e,t){var n=o.defer();return function(e,t){var n=new FileReader;return n.onload=function(e,t,n){return function(){n.$apply(function(){t.resolve(e.result)})}}(n,e,t),n.onerror=function(e,t,n){return function(){n.$apply(function(){t.reject(e.result)})}}(n,e,t),n.onprogress=function(e,t){return function(e){t.$broadcast("fileProgress",{total:e.total,loaded:e.loaded})}}(0,t),n}(n,t).readAsText(e),n.promise}}}]),angular.module("chargeApp").run(["$templateCache",function(e){e.put("views/about.html",' <div class="container"> <div xwindow> <p ng-if="width > 320">The device window is: [{{width}}, {{height}}].</p> <p> This is about view. </p> <ul> <li> charge count</li> <li> damage output</li> </ul> </div> </div> '),e.put("views/charge.html",'<div class="container"> <form> <label class="radio-inline"> <input type="radio" ng-model="opt" value="default" ng-change="change()">Default </label> <label class="radio-inline"> <input type="radio" ng-model="opt" value="pinsky" ng-change="change()">Pinsky </label> <label class="radio-inline"> <input type="radio" ng-model="opt" value="bang" ng-change="change()">Bang </label> <tt>opt = {{opt}}</tt><br> </form> <table> <tr ng-repeat="comment in comments track by $index"> <td> {{comment.conto}} </td> <td> {{comment.line}} </td> <td> {{comment.name}} </td> <td> {{comment.comment}} </td><td> </td></tr> </table> </div> <div class="form-group"> <label for="addComment">Conto</label> <input ng-model="addConto"> <label for="addComment">Number </label> <input ng-model="addLine"> <br> <label for="addComment">Name </label> <input ng-model="addName"> <label for="addComment">Comment</label> <input ng-model="addNote"> <button ng-click="addComment()" class="button button-primary">Add</button> </div> <form> <div class="row"> <div class="col-md-12"> <input type="file" ng-file-select="onFileSelect($files)" class="form-control-file border"> </div> </div> </form> <br> \x3c!--\n   <b>Statistics:</b><br />\n\n    <table class="table table-striped">\n     <tr>\n        <th>Name</th>\n        <th>Counts </th>\n     </tr>\n     <tr> \n        <td>Total Symbols </td>\n        <td>{{totalSymbols}}</td>\n     </tr>\n     <tr> \n        <td>Total Sequences </td>\n        <td>{{totalLHs}}</td>\n     </tr>\n    </table>\n   \n   <b>Preview:</b> \n   <input ng-model="visible" type="checkbox"/>\n   <br />\n   <i ng-hide="textSrc">No text file choosed</i>\n   <pre ng-show="visible">{{textSrc}}</pre>\n   \n   <br/> \n   <b>Progress:</b>\n  <progress value="{{progress}}"></progress>\n</div>\n--\x3e '),e.put("views/main.html",'<div class="jumbotron jumbotron-fluid"> <div class="container"> <div class="block"> <h1 class="animated fadeInUp">Inferno</h1> <p class="animated fadeInUp">Just Another Dante Suite</p> <div ng-hide="ie == 0"> <p class="animated fadeInUp">IE {{ie}}</p> </div> </div> </div> </div> <div class="container"> <p> <strong> Summary </strong> </p> <table class="table table-striped"> <tr> <th> </th> <th> Tx</th> <th> Rx</th> <th> Percentage</th> </tr> <tr> <td> symbols </td> <td>{{txTotalSymbols}} </td> <td>{{rxTotalSymbols}} </td> <td>{{rxTotalSymbols /txTotalSymbols * 100 | number : 2}} </td> </tr> <tr><td> sequences </td> <td> {{txTotalLHs}} </td> <td> {{rxTotalLHs}} </td> <td> {{rxTotalLHs/txTotalLHs * 100 | number : 2}} </td> </tr> </table> <div xwindow> <p ng-if="width > 320">The device window is: [{{width}}, {{height}}].</p> </div> </div> '),e.put("views/rx.html",'<div class="container"> <div class="row"> <div class="col-md-2 col-sm-12"> <div class="row"> <div class="col"> <form> <div class="form-group"> <div class="input-group"> <div class="input-group-addon"><i class="fa fa-search"></i></div> <input type="text" class="form-control" placeholder="query: start, end" ng-model="myQuery"> </div> </div> </form> </div> </div> <div class="row"> <div class="col"> <form> <button class="btn btn-secondary" ng-click="prev()"> prev</button> <button class="btn btn-secondary" ng-click="next()"> next</button> </form> </div> </div> </div> <div class="col-md-10 col-sm-12"> <div ng-repeat="canto in cantoes | myCantoFilter: myQuery  track by $index "> <div class="row" ng-if="canto.visible"> <div class="col-1" style="margin:0px 0px 0px 0px;padding:0px 0px; border: 1px solid #f8f9fa;"> <p class="line" style="margin:0px 0px 0px 0px;padding:0px 0px;background-color:#f8f9fa;">{{canto.name}}:{{canto.line}} </p> </div> <div class="col-11" style="padding-left:1px;padding-right:1px"> \x3c!--\n                  <div xelement>\n                    <p ng-if="elementSize.width > 100 && $index == 0" >The element width: {{elementSize.width}}.</p>\n                  </div>\n              --\x3e <p class="canto" style="background-color:lavender;margin-left:0;width:100%;" ng-bind-html="canto.text"></p> </div> </div> </div> </div> </div> <div class="row"> <div class="col"> <br><br> <ul class="list-group list-group-flush"> <li class="list-group-item" ng-repeat="comment in comments  | conto: myQuery track by $index"> <i class="fa fa-caret-right" sytle="height:80px" tooltip tooltip-content="comment.comment"> {{comment.name}} </i> </li> </ul> </div> </div> </div> ')}]);