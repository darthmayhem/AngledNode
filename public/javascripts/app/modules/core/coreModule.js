

define(['core/runners/logRunner'], function(logRunner) {
	var coreModule = angular.module('coreModule', ['ngRoute', 'themeModule']);
	coreModule.run(logRunner);
	
	coreModule.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/', { controller: 'homeController', templateUrl: '/views/home.html' })
			.when('/home', { controller: 'homeController', templateUrl: '/views/home.html' })
            .when('/contact', { controller: 'contactController', templateUrl: '/views/contact.html' })
	}]);
	
	require(['core/controllerReferences'], function(references) {
		require(references, function() {
			angular.bootstrap(document, ['coreModule']);
            global.appName = 'angled.Node';
		});
	});
});