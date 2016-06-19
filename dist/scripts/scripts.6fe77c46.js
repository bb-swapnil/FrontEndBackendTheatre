"use strict";angular.module("backendTheatreApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ui.router","LocalStorageModule"]).config(["$routeProvider","localStorageServiceProvider",function(a,b){b.setPrefix("backendTheatreApp").setStorageType("sessionStorage"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:{nowShowingInTheatres:["nowShowing",function(a){return a.nowShowingMovies()}],upcomingMovies:["upcomingMovies",function(a){return a.upcoming()}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/admin",{templateUrl:"views/admin.html",controller:"AdminCtrl",controllerAs:"admin",resolve:{upcomingMovies:["upcomingMovies",function(a){return a.upcoming()}]}}).when("/moviedetails",{templateUrl:"views/moviedetails.html",controller:"MoviedetailsCtrl",controllerAS:"moviedetails",resolve:{movieTomatoDetails:["movieDetails",function(a){return a.getTomatoResult()}],movieInfoDetails:["movieDetails",function(a){return a.getMovieInfo()}]}}).otherwise({redirectTo:"/"})}]),angular.module("backendTheatreApp").controller("MainCtrl",["$scope","$location","searchMovieText","nowShowingInTheatres","upcomingMovies",function(a,b,c,d,e){console.log(d),console.log(e);for(var f=0;f<e.length;f++){var g=new Date(e[f].upReleaseDate).toDateString();g=g.split(" "),console.log(g[1],g[2]),e[f].date=g[2],e[f].month=g[1]}a.slide_index=0,a.slide_left=function(){a.slide_index-4<=0?(a.slide_index=0,a.movieNowShowing=d.slice(0,4)):(a.slide_index-=4,a.movieNowShowing=d.slice(a.slide_index,a.slide_index+4))},a.slide_right=function(){a.slide_index+4>=d.length?(a.slide_index=d.length-4,a.movieNowShowing=d.slice(a.slide_index,d.length)):(a.slide_index=a.slide_index+4,a.slide_index+4>=d.length?(a.slide_index=d.length-4,a.movieNowShowing=d.slice(a.slide_index,d.length)):a.movieNowShowing=d.slice(a.slide_index,a.slide_index+4))},a.slide_left(),a.slide_index_upcoming=0,a.slide_left_upcoming=function(){a.slide_index_upcoming-5<=0?(a.slide_index_upcoming=0,a.movieComingSoon=e.slice(0,5)):(a.slide_index_upcoming-=5,a.movieComingSoon=e.slice(a.slide_index_upcoming,a.slide_index_upcoming+5))},a.slide_right_upcoming=function(){a.slide_index_upcoming+5>=e.length?(a.slide_index_upcoming=e.length-5,a.movieComingSoon=e.slice(a.slide_index_upcoming,e.length)):(a.slide_index_upcoming=a.slide_index_upcoming+5,a.slide_index_upcoming+5>=e.length?(a.slide_index_upcoming=e.length-5,a.movieComingSoon=e.slice(a.slide_index_upcoming,e.length)):a.movieComingSoon=e.slice(a.slide_index_upcoming,a.slide_index_upcoming+5))},a.slide_left_upcoming(),a.images="../images/add_to_cart_button.png",a.moreInfo=function(a){c.set(a),b.url("/moviedetails"),console.log("----------------------",a)},a.list_show_none=["1:35 pm","4:00 pm","6:35 pm","9:15 pm"],a.list_now_showing=[{image:"../images/img1.png"},{image:"../images/img2.png"},{image:"../images/img3.png"},{image:"../images/img1.png"}]}]),angular.module("backendTheatreApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("backendTheatreApp").directive("addToCart",function(){return{restrict:"E",template:'<a ng-href=\'#/moviedetails\'><img src="/images/add_to_cart_button.png" class="align_add_to_cart"  ></a>'}}),angular.module("backendTheatreApp").controller("IndexCtrl",["$scope","$window","movieTomato","searchMovieText","$location","$uibModalInstance",function(a,b,c,d,e,f){a.close=function(){f.close()},a.movieToSearch="",a.searchMovies=function(b){a.movieToSearch=b,d.set(a.movieToSearch),console.log("Movie entered",a.movieToSearch),a.close(),a.redirect=function(){e.url("/moviedetails")},a.redirect()}}]),angular.module("backendTheatreApp").controller("SearchmodalCtrl",["$scope","$uibModal",function(a,b){a.open=function(a){console.log(a),b.open({templateUrl:"/views/searchmodal.html",controller:"IndexCtrl",size:a})}}]),angular.module("backendTheatreApp").factory("searchMovieText",function(){var a={};return a.obj="",a.obj1="",a.set=function(b){a.obj=b,console.log("Obj set is",a.obj)},a.get=function(){return a.obj},a}).factory("upcomingMovies",["$q","$http","apiKey",function(a,b,c){return{upcoming:function(){var d=a.defer();return console.log("api is ",c.apiUrlFn()),b.get(""+c.apiUrlFn()+"db/upcoming").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]).factory("nowShowing",["$q","$http","apiKey",function(a,b,c){return{nowShowingMovies:function(){var d=a.defer();return console.log("api is ",c.apiUrlFn()),b.get(""+c.apiUrlFn()+"db/nowShowing").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]).factory("movieDetails",["$q","localStorageService","$http","apiKey","searchMovieText",function(a,b,c,d,e){var f="";return{getTomatoResult:function(){var g=a.defer();if(console.log("api is ",d.apiUrlFn()),f=e.get(),""!=f){b.set("storeId",f)}else f=b.get("storeId");return c.get(""+d.apiUrlFn()+"db/rottenTomatoes/"+f).success(function(a){g.resolve(a)}).error(function(a){g.reject(a)}),g.promise},getMovieInfo:function(){var b=a.defer();return c.get(""+d.apiUrlFn()+"/db/movieinfo/"+f).success(function(a){b.resolve(a)}).error(function(a){b.reject(a)}),b.promise}}}]).factory("movieApiaryInfo",["$q","$http","apiKey","searchMovieText",function(a,b,c,d){var e="",f="",g="";return{getSearchDetails:function(){var h=a.defer();return b.get(""+c.movieApiUrl+"search/movie?api_key="+c.key+"&query="+d.get()+"&year=2016").success(function(a){e=a.results[0].id,f=a.results[0].title,g=a.results[0].imdb_id,h.resolve(a,e,g)}).error(function(a){h.reject(a)}),h.promise},getMovieById:function(d){var e=a.defer(),f="";return b.get(""+c.movieApiUrl+"movie/"+d+"?api_key="+c.key).success(function(a){f=a,e.resolve(a)}).error(function(a){console.log("error",a),f=a,e.reject(a)}),e.promise},getTomatoResult1:function(c){var d=a.defer();return console.log("omdb movie title",f,e),b.get("http://www.omdbapi.com/?i="+c+"&year=2016&plot=full&r=json&tomatoes=true").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]),angular.module("backendTheatreApp").controller("MoviedetailsCtrl",["$sce","localStorageService","$http","$route","$uibModal","$location","apiKey","$q","$scope","movieTomatoDetails","movieInfoDetails",function(a,b,c,d,e,f,g,h,i,j,k){console.log("---------",j),console.log("++++++++++++",k),i.displayTomatoData={},i.displayTomatoData.imdbID=j.mtImdbID,i.displayTomatoData.movieDescription=j.mtMovieDescription,i.displayTomatoData.movieTitle=j.mtMovieTitle,i.displayTomatoData.allCritics=JSON.parse(j.mtAllCritics),i.displayTomatoData.topCritics=JSON.parse(j.mtTopCritics),i.displayTomatoData.audienceScore=JSON.parse(j.mtAudienceScore),i.displayTomatoData.genre=JSON.parse(j.mtGenre),i.displayMovieDetails=k,i.displayMovieDetails.infoMovieRuntime=parseInt(i.displayMovieDetails.infoMovieRuntime.replace("min",""));var l=i.displayMovieDetails.infoMovieRuntime,m=Math.trunc(l/60),n=l%60;i.displayMovieDetails.infoMovieRuntime=""+m+" hr."+n+" min",i.displayMovieDetails.infoMoviePosterPath=i.displayMovieDetails.infoMoviePosterPath.replace("./app",".."),i.kidsinmind=!1,null==i.displayMovieDetails.movieKIM_Rating?i.kidsinmind=!1:(i.displayMovieDetails.kimRating=i.displayMovieDetails.movieKIM_Rating.match(/\d{1}.\d{1}.\d{1,2}/)[0],i.displayMovieDetails.kimRating=i.displayMovieDetails.kimRating.split("."),i.displayMovieDetails.s_n="/images/kidsinmind/s&n"+i.displayMovieDetails.kimRating[0]+".jpg",i.displayMovieDetails.v_g="/images/kidsinmind/v&g"+i.displayMovieDetails.kimRating[1]+".jpg",i.displayMovieDetails.prof="/images/kidsinmind/prof"+i.displayMovieDetails.kimRating[2]+".jpg",i.displayMovieDetails.one_ten="/images/kidsinmind/1to10.jpg",i.kidsinmind=!0),console.log("The kids in mind rating is ",i.displayMovieDetails.kimRating,i.kidsinmind),i.displayMovieDetails.releaseYear=i.displayMovieDetails.infoMovieInTheatres.substr(i.displayMovieDetails.infoMovieInTheatres.length-4),console.log(i.displayMovieDetails);var o=i.displayTomatoData.allCritics.tomatometer;o>=60&&75>o?i.displayTomatoData.allCritics.tomatoImage="/images/rt_fresh.jpg":59>=o?i.displayTomatoData.allCritics.tomatoImage="/images/rt_rotten.jpg":i.displayTomatoData.allCritics.tomatoImage="/images/rt_certified.jpg";var p=i.displayTomatoData.topCritics.tomatometer;p>=60&&75>p?i.displayTomatoData.topCritics.tomatoImage="/images/rt_fresh.jpg":59>=p?i.displayTomatoData.topCritics.tomatoImage="/images/rt_rotten.jpg":i.displayTomatoData.topCritics.tomatoImage="/images/rt_certified.jpg",i.allBoldOrNormal="criticsLink",i.topBoldOrNormal="criticsLink",i.click=function(a){"all"==a?(i.tomatoMeter=i.displayTomatoData.allCritics,i.allBoldOrNormal="criticsLinkTextBold",i.topBoldOrNormal="criticsLink"):(i.tomatoMeter=i.displayTomatoData.topCritics,i.allBoldOrNormal="criticsLink",i.topBoldOrNormal="criticsLinkTextBold")},i.click("all");var q=i.displayTomatoData.audienceScore.averageRating;q=parseFloat(q.replace("/5","")),q>=3.5?i.displayTomatoData.audienceScore.audienceImage="/images/rt_user_likes.jpg":3.5>q&&(i.displayTomatoData.audienceScore.audienceImage="/images/rt_user_dislike.jpg"),i.audienceScore=i.displayTomatoData.audienceScore,i.audienceScore.ratingCount=i.audienceScore.ratingCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"),console.log(i.displayTomatoData),i.totalCasts=JSON.parse(i.displayMovieDetails.infoMovieCasts);for(var r=0;r<i.totalCasts.length;r++)null==i.totalCasts[r].profile_path?i.totalCasts[r].profile_path="/images/credits/image_not_found.jpg":i.totalCasts[r].profile_path="/images/credits"+i.totalCasts[r].profile_path;i.show6CastsFunction=function(){i.show6Casts={};for(var a=0;6>a;a++)i.show6Casts[a]=i.totalCasts[a]},i.show6CastsFunction(),i.show6Casts={};for(var s=0;6>s;s++)i.show6Casts[s]=i.totalCasts[s];i.ngShowAllText=!0,i.show6CastsText=!0,i.showAll=function(a){i.show6Casts=i.totalCasts,i.ngShowAllText=!a,1==i.ngShowAllText&&i.show6CastsFunction()},i.displayTomatoData.trailer="https://www.youtube.com/results?search_query="+i.displayTomatoData.movieTitle+"+trailer",i.trustSrc=function(b){return console.log(b),a.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list="+b+"+Trailer")},a.trustAsResourceUrl(i.displayTomatoData.trailer)}]),angular.module("backendTheatreApp").service("apiKey",["$location",function(a){var b="";return{key:"2c9306d42037dfb0de0fc3f153819054",movieApiUrl:"http://api.themoviedb.org/3/",apiUrlFn:function(){return b="localhost"==a.host()?"http://localhost:8000/api/":"http://69.28.91.229:8000/api/"}}}]),angular.module("backendTheatreApp").controller("AdminCtrl",["$scope","upcomingMovies","apiKey","$http",function(a,b,c,d){a.upcomingMovies=b,a.admin_upMovieDelete=function(b,e){console.log(e),d["delete"](""+c.apiUrlFn()+"db/upcoming/"+b).then(function(b){a.upcomingMovies.splice(e,1)})}}]),angular.module("backendTheatreApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/admin.html",'<div class="container"> <div class="row"> <div class="col-md-3"> <ul class="nav nav-pills nav-stacked admin-menu"> <li class="active"><a href="#" data-target-id="home"><i class="fa fa-home fa-fw"></i>Main Settings</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="widgets"><i class="fa fa-list-alt fa-fw"></i>Currently Playing</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="pages"><i class="fa fa-file-o fa-fw"></i>Coming Soon</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="charts"><i class="fa fa-bar-chart-o fa-fw"></i>Contact Settings</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="table"><i class="fa fa-table fa-fw"></i>Location Settings</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="forms"><i class="fa fa-tasks fa-fw"></i>Prices</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="calender"><i class="fa fa-calendar fa-fw"></i>Reports</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="library"><i class="fa fa-book fa-fw"></i>Future Use</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="applications"><i class="fa fa-pencil fa-fw"></i>Future Use</a></li> <li><a href="http://www.jquery2dotnet.com" data-target-id="settings"><i class="fa fa-cogs fa-fw"></i>Future Use</a></li> </ul> </div> <div class="col-md-9 well admin-content" id="home"> <p>Main Settings Here</p> <form name="form1" method="post" action=""> <p> <label for="SiteName">Website Name:</label> <input name="SiteName" type="text" id="SiteName" value="Huntsville Cinestar Theatre" size="50"> </p> <p> <label for="WebLink">Website Address:</label> <input name="WebLink" type="text" id="WebLink" value="http://www.cinestar.affpc.com" size="50"> </p> <p> <label for="screencount">Number of Screens:</label> <select name="screencount" size="1" id="screencount"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4" selected>4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </p> <p> <label for="CurrentTime">CurrentTime:</label> <input type="text" name="CurrentTime" id="CurrentTime"> </p> <p> <label for="TimeZone">TimeZone:</label> <select name="TimeZone" id="TimeZone"> </select> </p> <p>---------------------------------------------------------</p> <p><strong>Auto Play Time Configs:</strong> Start Time + Movie Run Time + Commerical Time + Clean Time = Next Start Time (rounded up to top of hour or 15 , 30 or 45 after)</p> <table width="100%" border="0"> <tr> <td>&nbsp;</td> <td align="center">Mon</td> <td align="center">Tues</td> <td align="center">Wed</td> <td align="center">Thur</td> <td align="center">Fri</td> <td align="center">Sat</td> <td align="center">Sun</td> </tr> <tr> <td>Start Time:</td> <td align="center"><label for="MondayStart"></label> <input name="MondayStart" type="text" id="MondayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="TuesdayStart"></label> <input name="TuesdayStart" type="text" id="TuesdayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="WednesdayStart"></label> <input name="WednesdayStart" type="text" id="WednesdayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="ThursdayStart"></label> <input name="ThursdayStart" type="text" id="ThursdayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="FridayStart"></label> <input name="FridayStart" type="text" id="FridayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="SaturdayStart"></label> <input name="SaturdayStart" type="text" id="SaturdayStart" value="10:00 AM" size="8"></td> <td align="center"><label for="SundayStart"></label> <input name="SundayStart" type="text" id="SundayStart" value="10:00 AM" size="8"></td> </tr> <tr> <td>End Time:</td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> <td align="center"><label for="MondayEnd"></label> <input name="MondayEnd" type="text" id="MondayEnd" value="10:00 PM" size="8"></td> </tr> </table> <p>&nbsp;</p> <p> <label for="CommericalTime">Commerical Time:</label> <input name="CommericalTime" type="text" id="CommericalTime" value="25 minutes"> </p> <p> <label for="CleanTime">Clean Time:</label> <input name="CleanTime" type="text" id="CleanTime" value="45 minutes"> </p> <p>-----------------------------------------------------------</p> <p> <input type="submit" name="Save" id="Save" value="Save"> </p> <p>&nbsp;</p> </form> <p>&nbsp;</p> </div> <div class="col-md-9 well admin-content" id="widgets"> Currently Playing Here <div> <button ng-click="addMovie()">Add movie</button> <button ng-click="removeMovie()">Remove movie</button> </div> <style type="text/css">.playdays {\n                    font-size: 9px;\n                }</style> <table width="100%" border="0"> <tr> <td><table width="100%" border="1"> <tr> <td><table width="100%" border="0"> <tr> <td align="center" bgcolor="#CCCCCC">Poster</td> <td align="center" bgcolor="#CCCCCC">Title</td> <td align="center" bgcolor="#CCCCCC">Length</td> <td align="center" bgcolor="#CCCCCC">Screen #</td> <td align="center" bgcolor="#CCCCCC">2D/3D</td> <td bgcolor="#CCCCCC"> </td> </tr> <tr> <td align="center"><img src="http://cinestar.affpc.com/images/nowShowing/inVq3FRqcYIRl2la8iZikYYxFNR.jpg" width="122" height="183"></td> <td align="center">Deadpool (2016)</td> <td align="center">1 hr.48 min</td> <td align="center">1</td> <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAzinjLWPltwH-uOnnx5I52yTt0N25ni2RX6s70GfWyW8WbRU" width="65" height="55"></td> <td align="center"><a href="#">Add</a> | <a href="#">Remove</a> | <a href="#">Edit</a></td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0"> <tr class="playdays"> <td align="center" bgcolor="#CCCCCC">Monday</td> <td align="center" bgcolor="#CCCCCC">Tuesday</td> <td align="center" bgcolor="#CCCCCC">Wednesday</td> <td align="center" bgcolor="#CCCCCC">Thursday</td> <td align="center" bgcolor="#CCCCCC">Friday</td> <td align="center" bgcolor="#CCCCCC">Saturday</td> <td align="center" bgcolor="#CCCCCC">Sunday</td> </tr> <tr class="playdays"> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> </tr> </table></td> </tr> </table></td> </tr> <tr> <td> <table width="100%" border="1"> <tr> <td><table width="100%" border="0"> <tr> <td align="center" bgcolor="#CCCCCC">Poster</td> <td align="center" bgcolor="#CCCCCC">Title</td> <td align="center" bgcolor="#CCCCCC">Length</td> <td align="center" bgcolor="#CCCCCC">Screen #</td> <td align="center" bgcolor="#CCCCCC">2D/3D</td> <td bgcolor="#CCCCCC"> </td> </tr> <tr> <td align="center"><img src="http://cinestar.affpc.com/images/nowShowing/inVq3FRqcYIRl2la8iZikYYxFNR.jpg" width="122" height="183"></td> <td align="center">Deadpool (2016)</td> <td align="center">1 hr.48 min</td> <td align="center">2</td> <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6YklnklaUUUypW-9SQwFJUmyjOmiPVk1vYB02lSmgNzq2FQ6" alt="" width="65" height="55"></td> <td align="center"><a href="#">Add</a> | <a href="#">Remove</a> | <a href="#">Edit</a></td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0"> <tr class="playdays"> <td align="center" bgcolor="#CCCCCC">Monday</td> <td align="center" bgcolor="#CCCCCC">Tuesday</td> <td align="center" bgcolor="#CCCCCC">Wednesday</td> <td align="center" bgcolor="#CCCCCC">Thursday</td> <td align="center" bgcolor="#CCCCCC">Friday</td> <td align="center" bgcolor="#CCCCCC">Saturday</td> <td align="center" bgcolor="#CCCCCC">Sunday</td> </tr> <tr class="playdays"> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> </tr> </table></td> </tr> </table> </td> </tr> <tr> <td> <table width="100%" border="1"> <tr> <td><table width="100%" border="0"> <tr> <td align="center" bgcolor="#CCCCCC">Poster</td> <td align="center" bgcolor="#CCCCCC">Title</td> <td align="center" bgcolor="#CCCCCC">Length</td> <td align="center" bgcolor="#CCCCCC">Screen #</td> <td align="center" bgcolor="#CCCCCC">2D/3D</td> <td bgcolor="#CCCCCC"> </td> </tr> <tr> <td align="center"><img src="http://cinestar.affpc.com/images/nowShowing/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg" width="122" height="183"></td> <td align="center">Zootopia (2016)</td> <td align="center">1 hr.48 min</td> <td align="center">3</td> <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAzinjLWPltwH-uOnnx5I52yTt0N25ni2RX6s70GfWyW8WbRU" alt="" width="65" height="55"></td> <td align="center"><a href="#">Add</a> | <a href="#">Remove</a> | <a href="#">Edit</a></td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0"> <tr class="playdays"> <td align="center" bgcolor="#CCCCCC">Monday</td> <td align="center" bgcolor="#CCCCCC">Tuesday</td> <td align="center" bgcolor="#CCCCCC">Wednesday</td> <td align="center" bgcolor="#CCCCCC">Thursday</td> <td align="center" bgcolor="#CCCCCC">Friday</td> <td align="center" bgcolor="#CCCCCC">Saturday</td> <td align="center" bgcolor="#CCCCCC">Sunday</td> </tr> <tr class="playdays"> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>12:00PM</p> <p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p> <p>12:00AM</p></td> <td align="center" valign="top"><p>2:00PM</p> <p>4:00PM</p> <p>6:00PM</p> <p>8:00PM</p> <p>10:00PM</p></td> </tr> </table></td> </tr> </table> </td> </tr> </table> </div> <div class="col-md-8 well admin-content" id="pages"> <div> <p>Coming Soon Here</p> </div> <div class="col-md-12 coming_soon_menu"> <div class="col-md-4"><h4 align="center">Poster</h4></div> <div class="col-md-2"><h4 align="center">Movie Name</h4></div> <div class="col-md-2"><h4 align="center">Duration</h4></div> <div class="col-md-2"><h4 align="center">Release Date</h4></div> <div class="col-md-2"><h4 align="center">Actions</h4></div> </div> <br> <div class="col-md-12 coming_soon_movies" ng-model="upcomingMovies" ng-repeat="adminUpcoming in upcomingMovies"> <div class="col-md-4 adminUpcoming"> <img ng-src="{{adminUpcoming.upPosterPath}}"> </div> <div class="col-md-2">{{adminUpcoming.upMovieName}}</div> <div class="col-md-2"><h4 align="center">Duration</h4></div> <div class="col-md-2">{{adminUpcoming.upReleaseDate}}</div> <div class="col-md-2"> <button type="button" class="btn btn-success" ng-click="admin_upMovieDelete(adminUpcoming.upMovieId, $index)">Delete</button> <button type="button" class="btn btn-success">Add to Screen</button> </div> </div> </div> <div class="col-md-9 well admin-content" id="charts">Contact Settings Here</div> <div class="col-md-9 well admin-content" id="table"> Location Settings Here </div> <div class="col-md-9 well admin-content" id="forms"> Price Settings Here </div> <div class="col-md-9 well admin-content" id="calender"> Reports Here </div> <div class="col-md-9 well admin-content" id="library">Future Use</div> <div class="col-md-9 well admin-content" id="applications">Future Use</div> <div class="col-md-9 well admin-content" id="settings">Future Use</div> </div> </div> <script type="text/javascript">$(document).ready(function()\n    {\n        var navItems = $(\'.admin-menu li > a\');\n        var navListItems = $(\'.admin-menu li\');\n        var allWells = $(\'.admin-content\');\n        var allWellsExceptFirst = $(\'.admin-content:not(:first)\');\n\n        allWellsExceptFirst.hide();\n        navItems.click(function(e)\n        {\n            e.preventDefault();\n            navListItems.removeClass(\'active\');\n'+"            $(this).closest('li').addClass('active');\n\n            allWells.hide();\n            var target = $(this).attr('data-target-id');\n            $('#' + target).show();\n        });\n    });</script> <style type=\"text/css\">.coming_soon_menu{\n        background-color: #5f5f5f;\n        color: white;\n        border-bottom-style: solid;\n        border-color: white;\n    }\n    .coming_soon_movies{\n        background-color: black;\n        color: ghostwhite;\n        border-bottom-style: solid;\n        border-color: white;\n    }\n    .coming_soon_movies>.adminUpcoming>img{\n        width: 160px;\n        height: 230px;\n    }</style>"),a.put("views/main.html",'<div class="row&quot;"> <div class="col-md-12" id="main_view"> <div class="row"> <div class="container"> <div class="col-md-1" id="top-angle-left"> <p><a ng-href=""><span ng-click="slide_left()" class="glyphicon glyphicon-menu-left"></span></a></p> </div> <div class="col-md-10"> <div class="col-md-4" id="left_banner_now_showing"></div> <div class="col-md-4" id="now_showing_text">NOW SHOWING</div> <div class="col-md-4" id="right_banner_now_showing"></div> </div> <div class="col-md-1" id="top-angle-right"> <p><span ng-click="slide_right()" class="glyphicon glyphicon-menu-right"></span></p> </div> </div> <div class="container" id="show_list"> <div class="col-md-3 container list_now_showing" ng-repeat="mvs in movieNowShowing"> <div class="wrap_all"> <img class="images" ng-src="{{mvs.infoMoviePosterPath}}"> <div class="all_timings"> <div class="list-show-none"> <span ng-repeat="list_show in mvs.list_show_none">{{list_show}}</span> </div> <div class="list-show-3d"> <span><img ng-src="{{mvs.list_show_3d_image}}"> </span> <span ng-repeat="list_show in mvs.list_show_3d">{{list_show}}</span> </div> <div class="list-show-2d"> <!--<img ng-src="">--> <span><img ng-src="{{mvs.list_show_2d_image}}"></span> <span ng-repeat="list_show in mvs.list_show_2d">{{list_show}}</span> </div> </div> <add-to-cart ng-click="moreInfo(mvs.infoImdbID)" class="align_add_to_cart show-cart"></add-to-cart> </div> </div> </div> </div> <div class="row coming-soon"> <div class="container coming-soon"> <div class="col-md-12"> <div class="col-md-5" id="bottom-angle-left"> <p><span ng-click="slide_left_upcoming()" class="glyphicon glyphicon-menu-left"></span></p> </div> <div class="col-md-2"> <h1 id="coming_soon_text">Coming Soon</h1> </div> <div class="col-md-5" id="bottom-angle-right"> <p><span ng-click="slide_right_upcoming()" class="glyphicon glyphicon-menu-right"></span></p> </div> </div> </div> <div class="container" id="coming-soon"> <div class="col-md-3" id="list_coming_soon" ng-repeat="mcs in movieComingSoon"> <div class="parent"> <!--<div class="imagewrap">--> <div class="date_month"> <h1 class="coming_soon_date">{{mcs.date}}</h1> <h1 class="coming_soon_month">{{mcs.month}}</h1> </div> <img class="coming_soon_circle" src="/images/circle.png"> <!--</div>--> <img class="coming_soon_images" ng-src="{{mcs.upPosterPath}}"> </div> </div> </div> </div> </div> </div>'),a.put("views/moviedetails.html",'<div class="row" data-ng-cloak> <div class="container"> <div class="col-md-8" data-ng-model="displayMovieDetails" ng-cloak> <!--<p>Hello {{movieTomato}}</p>--> <div class="container"> <div class="col-md-4"> <br> <img ng-src="{{displayMovieDetails.infoMoviePosterPath}}" class="mdImage"> </div> <div class="col-md-8" data-ng-model="displayTomatoData"> <div class="movieTitle"><h1>{{displayTomatoData.movieTitle}} ({{displayMovieDetails.releaseYear}})</h1></div> <div class="rottenTomatoesInfo col-md-12"> <div class="col-md-4 scorePanel" ng-model="tomatoMeter"> <h3>TOMATOMETER</h3> <div class="tomatoMeterText"> <img id="tomatoImage" ng-src="{{tomatoMeter.tomatoImage}}"> <span class="tomatoMeterPercentage">{{tomatoMeter.tomatometer}}%</span> </div> <br> <div class="tomatoMeterText">Average Rating: <span class="tomatoMeterTextResults">{{tomatoMeter.averageRating}}</span> </div> <div class="tomatoMeterText">Reviews Counted: <span class="tomatoMeterTextResults">{{tomatoMeter.reviewCount}}</span> </div> <div class="tomatoMeterText">Fresh: <span class="tomatoMeterTextResults">{{tomatoMeter.freshCount}}</span> </div> <div class="tomatoMeterText">Rotten: <span class="tomatoMeterTextResults">{{tomatoMeter.rottenCount}}</span> </div> </div> <div class="col-md-4 scorePanel" id="marginRight"> <br> <div class="shiftRight"> <span class="criticsHead"><a class="{{allBoldOrNormal}}" ng-click="click(\'all\')">All Critics</a></span> <span class="criticsHead">|</span> <span class="criticsHead"><a class="{{topBoldOrNormal}}" ng-click="click(\'top\')">Top Critics</a></span> </div> <br> <!--Progress Bar--> <div class="progress"> <div class="progress-bar" role="progressbar" style="width:0"></div> <div class="progress-bar" role="progressbar" aria-valuenow="{{tomatoMeter.tomatometer}}" aria-valuemin="0" aria-valuemax="100" style="width: {{tomatoMeter.tomatometer}}%"> </div> </div> <p class="criticsConcensus">Critics Consensus:<span class="criticsConcensusInfo">{{tomatoMeter.criticsConsensus}}</span></p> </div> <div class="col-md-4 scorePanel" ng-model="audienceScore"> <h3>AUDIENCE SCORE</h3> <div class="audiencePoint"> <img id="audienceImage" ng-src="{{audienceScore.audienceImage}}"> <span class="tomatoMeterPercentage">{{audienceScore.tomatometer}}%</span> </div> <br> <div class="tomatoMeterText">Average Rating: <span class="tomatoMeterTextResults">{{audienceScore.averageRating}}</span> </div> <div class="tomatoMeterText">User Rating: <span class="tomatoMeterTextResults">{{audienceScore.ratingCount}}</span> </div> </div> </div> </div> </div> <br> <div class="container" ng-model="displayMovieDetails"> <div class="col-md-4"> <p id="showtime">Showtimes</p> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> </div> <div class="col-md-8"> <div class="movieDes">{{displayMovieDetails.infoMovieDescription}}</div> <br> <div class="col-md-4 movieTopic"> <div>Rating:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieRated}}</div> </div> <div class="col-md-4 movieTopic"> <div>Genre:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieGenre}}</div> </div> <div class="col-md-4 movieTopic"> <div>Directed By:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieDirectedBy}}</div> </div> <div class="col-md-4 movieTopic"> <div>Written By:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieWrittenBy}}</div> </div> <div class="col-md-4 movieTopic"> <div>In Theatres:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieInTheatres}}</div> </div> <div class="col-md-4 movieTopic"> <div>Box Office:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieBoxOffice}}</div> </div> <div class="col-md-4 movieTopic"> <div>Run Time:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieRuntime}}</div> </div> <div class="col-md-4 movieTopic" ng-if="kidsinmind"> <br><br><br> <div>Parents Rating:</div> </div> <div class="col-md-8 movieDetails" ng-if="kidsinmind"> <!--<div><b>SEX & NUDITY</b></div>--> <div><img class="kim_sex_nudity" ng-src="{{displayMovieDetails.s_n}}"></div> <div><img class="kim_violence_gore" ng-src="{{displayMovieDetails.v_g}}"></div> <div><img class="kim_profanity" ng-src="{{displayMovieDetails.prof}}"></div> <div><img class="kim_one2ten" ng-src="{{displayMovieDetails.one_ten}}"></div> </div> <div class="col-md-8 movieTopic"> <div>{{displayMovieDetails.infoMovieProduction}}: <span><a ng-href="{{displayMovieDetails.infoMovieWebsite}}">Official Site</a> </span> </div> </div> </div> <div class="col-md-4"></div> <div class="col-md-8"><hr></div> </div> </div> <div class="col-md-4 rightPage" data-ng-model="theMovieDbId" ng-cloak> <!--Book tickets , Show trailer, Share on social media--> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial"> BUY TICKETS </button> </div> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial"> SHARE ON <a ng-href="http://www.facebook.com"> <img class="shareSocial" src="/images/shareOnFacebook.png"> </a> <span> <a ng-href="http://www.twitter.com"> <img class="shareSocial" src="/images/shareOnTwitter.png"> </a> </span> </button> </div> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial" data-toggle="modal" data-target="#myModal">WATCH TRAILER</button> </div> </div> </div> <div class="container"> <div class="col-md-3"> <div class="col-md-12"><p id="cast">Cast</p></div> </div> <br> <div class="col-md-12"> <div class="col-md-9" data-ng-model="casts"> <div class="col-md-4 casts" ng-repeat="casts in show6Casts"> <div class="col-md-4 castsImage"> <img ng-src="{{casts.profile_path}}"> </div> <div class="col-md-8"> <p>{{casts.name}}</p> <p class="castCharacter">as {{casts.character}}</p> </div> </div> </div> <div class="col-md-5"> <h6 class="ngShowAllText"> <a class="cursor4ShowAll" ng-if="ngShowAllText==true" ng-click="showAll(ngShowAllText)" ng-if="ngShowAllText==true"> Show More Cast <span class="glyphicon glyphicon-triangle-bottom cursor4ShowAll"></span> </a> </h6> <h6 class="ngShowAllText"> <a class="cursor4ShowAll" ng-if="ngShowAllText==false" ng-click="showAll(ngShowAllText)" ng-if="ngShowAllText==true"> Show Less Cast <span class="glyphicon glyphicon-triangle-top cursor4ShowAll"></span> </a> </h6> </div> </div> </div> </div> <!--<button class = "btn btn-primary btn-lg" data-toggle = "modal" data-target = "#myModal">--> <!--Launch demo modal--> <!--</button>--> <!-- Modal --> <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-ng-model="displayTomatoData"> <div class="modal-dialog"> <div class="moveCrossRight"> <span data-dismiss="modal" class="glyphicon glyphicon-remove-circle lightGray"></span> <!--<a data-dismiss="modal"><img clss="modalClose" src="../images/modalClose.png"></a>--> </div> <div class="modal-content" id="yt-player"> <div class="embed-responsive embed-responsive-16by9"> <iframe class="embed-responsive-item" ng-src="{{trustSrc(displayTomatoData.movieTitle)}}" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe> <!--<iframe width="854" height="480" src="https://www.youtube.com/watch?v=jWM0ct-OLsM" frameborder="0" allowfullscreen></iframe>--> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal --> <script type="text/javascript">$("#myModal").on(\'hidden.bs.modal\', function (e) {\r\n        $("#myModal iframe").attr("src", $("#myModal iframe").attr("src"));\r\n    });</script>'),
a.put("views/searchmodal.html",'<div> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Search Your Movies Here</h4> </div> <div class="modal-body"> <div class="input-group stylish-input-group"> <input type="text" class="form-control" ng-model="movieToSearch" placeholder="Type a movie name"> <span class="input-group-addon" ng-click="searchMovies(movieToSearch)"> <button> <span class="glyphicon glyphicon-search"></span> </button> </span> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" ng-click="close()">Close</button> </div> <!-- modal-footer --> </div>'),a.put("views/searchresults.html","<p>This is the searchResults view.</p>"),a.put("views/trailermodal.html",'<div ng-controller="MoviedetailsCtrl"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Search Your Movies Here</h4> </div> <div class="modal-body"> <div class="input-group stylish-input-group"> <input type="text" class="form-control" ng-model="movieToSearch" placeholder="Type a movie name"> <span class="input-group-addon" ng-click="searchMovies(movieToSearch)"> <button> <span class="glyphicon glyphicon-search"></span> </button> </span> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" ng-click="close()">Close</button> </div> <!-- modal-footer --> </div>')}]);