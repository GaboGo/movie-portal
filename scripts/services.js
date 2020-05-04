(function(){

	var app = angular.module('portal-services', []);

	app.factory("apiService", ["$http", function($http){

		var url = 'https://api.themoviedb.org/3/';

		return {
			getSearch: function(keyword) {
				return $http.get(url+'search/movie?api_key=3a5b7b6b48e76636c25308c8a3b370f3&query='+keyword);
			},
			getByFilters: function(page,year,opt,genre,keyword) {
				return $http.get(url+'discover/movie?api_key=3a5b7b6b48e76636c25308c8a3b370f3&page='+page+'&year='+year+'&sort_by='+opt+'&with_genres='+genre+'&with_keywords='+keyword);
			},
			getDiscover: function(page) {
				return $http.get(url+'discover/movie?api_key=3a5b7b6b48e76636c25308c8a3b370f3&page='+page);
			},
			getMovie: function(movieId) {
				return $http.get(url+'movie/'+movieId+"?api_key=3a5b7b6b48e76636c25308c8a3b370f3&append_to_response=videos,credits,keywords");
			}
		};
	}]);

})();
