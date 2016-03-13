

define(function() {
	angular
		.module('coreModule')
		.controller('homeController', ['$scope', 'AuthService', function($scope, AuthService) {
			$scope.title = 'home.Node';
			$scope.user = AuthService.getUserProfile();
			$scope.homeForm = {display: true};
		}]);
});