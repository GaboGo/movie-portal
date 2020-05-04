(function(){

  var app = angular.module('moviePortal', ['ngRoute','portal-directives','portal-services','portal-controllers','infinite-scroll']);

  app.config(['$routeProvider',function($routeProvider) {
      $routeProvider
      .when("/", {
          templateUrl : "templates/movie-discover.html",
          controller: "PortalController",
          controllerAs: 'portal'
      })
      .when("/movie/:id", {
          templateUrl : "templates/movie-detail.html",
          controller: "MovieDetailController",
          controllerAs: 'movie'
      });
  }]);

})();
