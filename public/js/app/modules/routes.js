/**
 * Created by steve_haight on 4/4/2016.
 */

define(['./app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/home', { controller: 'homeController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/contact', { controller: 'contactController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/profile', { controller: 'profileController', templateUrl: '/views/index.html', access: {restricted: true} });
        $routeProvider.when('/login', { controller: 'loginController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/logout', { controller: 'logoutController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/loggedout', { controller: 'loggedoutController', templateUrl: '/views/index.html', access: {restricted: false} });
        $routeProvider.when('/register', { controller: 'registerController', templateUrl: '/views/index.html', access: {restricted: false} });

        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
});