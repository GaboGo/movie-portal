(function(){

    var app = angular.module('portal-directives', []);

	app.directive("portalHeader", function() {
	  return {
  		  restrict: 'E',
  		  templateUrl: "templates/portal-header.html",
        controller: "HeaderController"
  	   };
	 });

     app.directive("portalNav", function() {
      return {
          restrict: 'E',
          templateUrl: "templates/portal-nav.html"
        };
     });

     app.directive("portalItems", function() {
       return {
           restrict: 'E',
           templateUrl: "templates/portal-items.html"
         };
     });
 })();
