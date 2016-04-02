

define(['core/runners/log.runner'], function(logRunner) {
	var coreModule = angular.module('coreModule',
		[
			'ngRoute',
			'authModule',
			'configModule',
			'menuModule',
			'themeModule',
			'password.directive'
		]);

	coreModule.run(logRunner);

	coreModule.run(function ($rootScope, $location, $route, AuthService) {
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

	coreModule.config(['$routeProvider', function($routeProvider){
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
	}]);

	coreModule.init = function(){

	};

	require(['core/references/controller.references'], function(references) {
		require(references, function() {
			angular.bootstrap(document, ['coreModule']);
		});
	});
});