

define(['core/runners/logRunner'], function(logRunner) {
	var coreModule = angular.module('coreModule', ['ngRoute', 'themeModule']);
	coreModule.run(logRunner);
	
	coreModule.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/', { controller: 'homeController', templateUrl: '/views/home.html' })
			.when('/home', { controller: 'homeController', templateUrl: '/views/home.html' })
	}]);
	
	require(['core/controllerReferences'], function(references) {
		require(references, function() {
			angular.bootstrap(document, ['coreModule']);
		});
	});
});