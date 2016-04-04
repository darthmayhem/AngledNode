
define(function () {

	'use strict';

	require(['controllers', 'services', 'directives', 'runners'],
		function (controllersReferences, serviceReferences, directiveReferences, runnerReferences){
			require(controllersReferences, function(){});
			require(serviceReferences, function(){});
			require(directiveReferences, function(){});
			require(runnerReferences, function(){});
		});

	var app = angular.module('coreModule',
		[
			'ngRoute',
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

	app.config(['$routeProvider', '$locationProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/home', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/contact', { controller: 'contactController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/profile', { controller: 'profileController', templateUrl: '/views/index.html', access: {restricted: true} })
				.when('/login', { controller: 'loginController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/logout', { controller: 'logoutController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/loggedout', { controller: 'loggedoutController', templateUrl: '/views/index.html', access: {restricted: false} })
				.when('/register', { controller: 'registerController', templateUrl: '/views/index.html', access: {restricted: false} })
				.otherwise({redirectTo: '/'});
		}
	]);

	//app.run(runners);

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
