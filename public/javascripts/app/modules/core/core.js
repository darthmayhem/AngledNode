
define(function () {

	'use strict';

    require([
            'runners',
            'controllers',
            'services',
            'directives'
        ],
        function (
            runnerReferences,
            controllerReferences,
            serviceReferences,
            directiveReferences
        ){
            require(runnerReferences, function(){});
            require(controllerReferences, function(){});
            require(serviceReferences, function(){});
            require(directiveReferences, function(){});

            require('theme', function(){});
        }
    );

	var app = angular.module(
		'coreModule',
		[
			'ngRoute',
			'runners',
            'controllers',
			'services',
			'directives',
			'theme'
		]
	);

	app.init = function () {
		console.log('bootstrapping core module...');
		angular.bootstrap(document, ['coreModule']);
        console.log('complete');
	};

	app.config([
		'$routeProvider',
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
