(function(){

  var app = angular.module('portal-controllers', []);

  app.controller('PortalController',['$http','$scope','apiService', '$route', '$location',function($http, $scope, apiService, $route, $location){

    $scope.portal = this;
    $scope.portal.items = [];
    $scope.response = false;
    $scope.busy = false;
    $scope.page = 1;
    $scope.year = '';
    $scope.popularity = 'popularity.desc'
    $scope.genre = ''
    $scope.keywords = ''
    $scope.filters = false;
    $scope.searchFilter = false;


    init = function(){
      $scope.page = 1;

      $scope.busy = true;

      apiService.getDiscover($scope.page).then(function(res){

          $scope.response = res.status == '200' ? true : false;

          if($scope.response){
            $scope.portal.items = res.data.results;
            $scope.totalPages = res.data.total_pages;
          }
          $scope.busy = false;
      });

    }

    $scope.byFilters = function(){

      console.log($scope.year, $scope.popularity, $scope.genre, $scope.keywords);
      $scope.page = 1;
      $scope.filters = true;

      $scope.busy = true;

      apiService.getByFilters($scope.page, $scope.year, $scope.popularity, $scope.genre, $scope.keywords).then(function(res){

          $scope.response = res.status == '200' ? true : false;

          if($scope.response){
            $scope.portal.items = res.data.results;
            $scope.totalPages = res.data.total_pages;
          }
          $scope.busy = false;
      });
    }

    $scope.loadMore = function() {
        
        if($scope.filters){
            if($scope.busy) return;
            $scope.busy = true;
    
            if($scope.page <= $scope.totalPages)
            { $scope.page++;
               apiService.getByFilters($scope.page, $scope.year, $scope.popularity, $scope.genre, $scope.keywords).then(function(res){
                   res.data.results.forEach(function(element){
                      $scope.portal.items.push(element);
                   })
                   $scope.busy = false;
               });
            }
        } else {
            if($scope.busy) return;
            $scope.busy = true;
    
            if($scope.page <= $scope.totalPages)
            { $scope.page++;
               apiService.getDiscover($scope.page).then(function(res){
                   res.data.results.forEach(function(element){
                      $scope.portal.items.push(element);
                   })
                   $scope.busy = false;
               });
            }
        }

    };

    $scope.getYear = function(date){
      var array = date.split("-");
      return array[0];
    }

    $scope.goToDetails = function(id){

      $location.path('/movie/'+id);
    }

    $scope.range = function(asyncAount){

      var array = [];

      for (var i = 0; i < count; i++) {
        array.push(i)
      }

      return array;
    }

    init();

  }]);

  app.controller('HeaderController',['$http','$scope','apiService', '$route','$location',function($http, $scope, apiService, $route, $location){

      $scope.search = this;
      $scope.search.items = [];
      $scope.keyword = '';
      $scope.searchResponse = '';
      $scope.message = '';

      $scope.search = function(){

        $scope.search.items = [];

        if($scope.keyword == ""){

          $scope.searchResponse = false;

        }else {
          $scope.filter = true;
          apiService.getSearch($scope.keyword).then(function(res){

              $scope.searchResponse = res.status == '200' ? true : false;

              if($scope.searchResponse){
                $scope.search.items = res.data.results;
              }
              else
                $scope.message = 'Movie not found! Try again';
           });
        }
      }

      $scope.goToDetails = function(id){

        $location.path('/movie/'+id);
      }

  }]);

  app.controller('MovieDetailController',['$http','$scope','apiService', '$route', '$sce',function($http, $scope, apiService, $route, $sce){

    $scope.actors = [];
    $scope.genres = [];
    $scope.keywords = [];


    init = function(){
      apiService.getMovie($route.current.params.id).then(function(res){
          if (res.status == 200) {
            $scope.movie = res.data;
            $scope.actors = res.data.credits.cast;
            $scope.video = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + res.data.videos.results[0].key);
            getGenres();
            getKeywords();
          }
      });
    }

    $scope.getYear = function(date){
      if(date){
        var array = date.split("-");
        return array[0];
      }
    }

    $scope.getDirectors = function(){
      var directors = [];
      if ($scope.movie.credits) {
        $scope.movie.credits.crew.forEach(function(entry){
            if (entry.job === 'Director') {
                directors.push(entry.name);
            }
        })
        return 'Director: ' + directors.join(', ');
      }
    }

    getGenres = function(){
      $scope.genres = [];
      $scope.movie.genres.forEach(function(entry){
          $scope.genres.push(entry.name);
      })
    }

    getKeywords = function(){
      $scope.keywords = [];
      $scope.movie.keywords.keywords.forEach(function(entry){
          $scope.keywords.push(entry.name);
      })
    }

    init();

  }]);

})();
