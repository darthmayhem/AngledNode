
define(function() {
	angular
		.module('coreModule')
		.controller('homeController', ['$rootScope', '$scope', 'AuthService', function($rootScope, $scope, AuthService) {
			$scope.title = 'home.Node';
			$rootScope.userProfile = AuthService.getUserProfile();
			$scope.homeForm = {display: true};
		}]);
});