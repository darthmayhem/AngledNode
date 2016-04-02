

define(function (require) {
	'use strict';

	//var angular = require('angular');
	//var angularRoute = require('angular-route');

	var services = require('./references/service.references');
	var controllers = require('./references/controller.references');
	var directives = require('./references/directive.references');
	var runners = require('./references/runner.references');

	var theme = require('../theme/theme');

	var app = angular.module('coreModule',
		[
			'services',
			'controllers',
			'directives',
			'runners',
			'theme'
		]
	);

	app.init = function () {
		console.log('hi');
		angular.bootstrap(document, ['coreModule']);
	};

	app.config(['$routeProvider', '$locationProvider', '$httpProvider',
		function ($routeProvider, $locationProvider, $httpProvider) {
			//$httpProvider.responseInterceptors.push('httpInterceptor');

			$routeProvider
				.when('/', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/home', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/contact', { controller: 'contactController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/profile', { controller: 'profileController', templateUrl: '/views/index.html', access: {restricted: true} })
				.when('/login', { controller: 'loginController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/logout', { controller: 'logoutController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/loggedout', { controller: 'loggedoutController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/register', { controller: 'registerController', templateUrl: '/views/index.html', access: {restricted: false} })
				.otherwise({redirectTo: '/'})

			$locationProvider.html5Mode(true);
		}
	]);

	app.run(logRunner);

	app.run(function ($window, $rootScope, $location, $route, AuthService) {
		//auth.setAuthorizationHeaders();
		//user.initialize();

		$rootScope.$on('$routeChangeStart',
			function (event, next) {
				$rootScope.userProfile = AuthService.getUserProfile();

				if (next.access.restricted &&
					!AuthService.isLoggedIn()) {
					$location.path('/login');
					$route.reload();
				}
			});
	});

	return app;
});