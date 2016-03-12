

define(['core/runners/logRunner'], function(logRunner) {
	var coreModule = angular.module('coreModule', ['ngRoute', 'authModule', 'themeModule']);

	coreModule.run(logRunner);
	
	coreModule.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/', { controller: 'homeController', templateUrl: '/views/home.html' })
			.when('/home', { controller: 'homeController', templateUrl: '/views/home.html' })
            .when('/contact', { controller: 'contactController', templateUrl: '/views/contact.html' })
            .when('/profile', { controller: 'profileController', templateUrl: '/views/profile.html' })
			.when('/login', { controller: 'registerController', templateUrl: '/views/login.html' })
			.when('/register', { controller: 'registerController', templateUrl: '/views/register.html' })
			.otherwise({redirectTo: '/'})
	}]);
	
	require(['core/controllerReferences'], function(references) {
		require(references, function() {
			angular.bootstrap(document, ['coreModule']);
            global.appName = 'angled.Node';
		});
	});
});