'use strict';

/**
 * @ngdoc service
 * @name backendTheatreApp.searchMovieText
 * @description
 * # searchMovieText
 * Service in the backendTheatreApp.
 */
angular.module('backendTheatreApp')
  .factory('signup', function ($q, $http, apiKey){
  return {
    registration: function(data){
      var deferred = $q.defer();
      $http.post(""+apiKey.apiUrlFn()+"db/registerUser", data)
        .success(function(data, status, headers){
          deferred.resolve(data);
        }).error(function(data){
        deferred.reject(data);
      });
      return deferred.promise;
    }
  }
})
  .factory('signin', function ($q, $http, apiKey){
    return {
      signin: function(data){
        var deferred = $q.defer();
        $http.post(""+apiKey.apiUrlFn()+"db/userLogin", data)
          .success(function(data, status, headers){
            console.log(data);
            deferred.resolve(data);
          }).error(function(data){
          deferred.reject(data);
        });
        return deferred.promise;
      },
      userLoggedIn: function(){
        var deferred = $q.defer();
        $http.get(""+apiKey.apiUrlFn()+"db/check")
          .success(function(data, status, headers){
            console.log(data);
            deferred.resolve(data);
          }).error(function(data){
          deferred.reject(data);
        });
        return deferred.promise;
      }
    }
  })
  .factory('signout', function ($q, $http, apiKey){
    return {
      signout: function () {
        var deferred = $q.defer();
        $http.get("" + apiKey.apiUrlFn() + "db/userLogout")
          .success(function (data, status, headers) {
            console.log(data);
            deferred.resolve(data);
          }).error(function (data) {
          deferred.reject(data);
        });
        return deferred.promise;
      }
    }
  })
  .factory('userLogInStatus', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user = {};
    var loginUser = function(newObj) {
      user.emailId = newObj;
      console.log(user);
    };

    var getUser = function(){
      console.log(user);
      return user.emailId;
    };

    return {
      loginUser: loginUser,
      getUser: getUser
    };
  })
  .factory('searchMovieText', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
      var smt = {};
      smt.obj = "";
      smt.obj1 = "";
      smt.set = function set(param){
          smt.obj = param;
          console.log("Obj set is",smt.obj);
      };
      smt.get = function get(){
          return smt.obj;
      };
      return smt;
  })
  .factory('upcomingMovies', function ($q, $http, apiKey){
    return {
        upcoming: function(){
            var deferred = $q.defer();
            console.log("api is ",apiKey.apiUrlFn());
            $http.get(""+apiKey.apiUrlFn() + "db/upcoming")
                .success(function (data){
                    deferred.resolve(data);
                }).error(function (data){
                deferred.reject(data);
            });
            return deferred.promise;
        }
    }
  })
  .factory('nowShowing', function ($q, $http, apiKey){
      return {
          nowShowingMovies: function(){
              var deferred = $q.defer();
              console.log("api is ",apiKey.apiUrlFn());
              $http.get(""+apiKey.apiUrlFn() + "db/nowShowing")
                  .success(function (data){
                      deferred.resolve(data);
                  }).error(function (data){
                      deferred.reject(data);
              });
              return deferred.promise;
          }
      }
  })
  .factory('movieDetails', function ($q,localStorageService,$http,apiKey,searchMovieText) {
      var id ="";
      return {
          getTomatoResult: function () {
              var deferred = $q.defer();
              //var movieFormat = searchMovieText.get();
              console.log("api is ",apiKey.apiUrlFn());
              id = searchMovieText.get();
              if(id!=""){
                  var storedId = localStorageService.set('storeId',id);
              }else{
                  id = localStorageService.get('storeId');
              }
              //$http.get("" + apiKey.apiUrlFn() + "db/rottenTomatoes/zootopia")
              $http.get("" + apiKey.apiUrlFn() + "db/rottenTomatoes/"+id)
                  .success(function (data) {
                      //console.log("------", data);
                      deferred.resolve(data);
                  }).error(function (data) {
                      //console.log("????", data);
                      deferred.reject(data);
              });
              return deferred.promise;
          },
          getMovieInfo: function () {
              var deferred = $q.defer();
              //$http.get("" + apiKey.apiUrlFn() + "/db/movieinfo/zootopia")
              $http.get("" + apiKey.apiUrlFn() + "/db/movieinfo/"+id)
                  .success(function (data) {
                      deferred.resolve(data);
                  }).error(function (data){
                  deferred.reject(data);
              });
              return deferred.promise;
          }
      };
  })
  .factory('movieApiaryInfo', function ($q,$http,apiKey,searchMovieText) {
      var movieId = "";
      var movieTitle = "";
      var movieImdbId = "";
      return {
          getSearchDetails: function () {
              var deferred = $q.defer();
              //search movies
              $http.get(""+apiKey.movieApiUrl+"search/movie?api_key="+apiKey.key+"&query="+searchMovieText.get()+"&year=2016")
                  .success(function (data) {
                      movieId = data.results[0].id;
                      movieTitle = data.results[0].title;
                      movieImdbId = data.results[0].imdb_id;
                      //console.log("!!!!!!!!!!!!!!!!", data);
                      deferred.resolve(data,movieId,movieImdbId);
                  }).error(function (data) {
                  //console.log("????", data);
                  deferred.reject(data);
              });
              return deferred.promise;
          },
          getMovieById: function (id) {
              var deferred = $q.defer();
              var results = "";
              $http.get(""+apiKey.movieApiUrl+"movie/"+id+"?api_key="+apiKey.key)
                  .success(function (data) {
                      //console.log("id walka result", data);
                      results = data;
                      deferred.resolve(data);
                  }).error(function (data) {
                  console.log("error", data);
                  results = data;
                  deferred.reject(data);
              });
              //return results;
              return deferred.promise;
          },
          getTomatoResult1: function (id) {
              var deferred = $q.defer();
              console.log("omdb movie title",movieTitle,movieId);
              $http.get("http://www.omdbapi.com/?i="+id+"&year=2016&plot=full&r=json&tomatoes=true")
                  .success(function (dataOmdb){
                      deferred.resolve(dataOmdb);
                      //console.log("omdb data",dataOmdb);
                  }).error(function(data){
                    deferred.reject(data);
              });
              return deferred.promise;
          }
      };
  });
