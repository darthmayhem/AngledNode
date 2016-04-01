
define(function() {
	angular
		.module('coreModule')
		.controller('loggedoutController', ['$rootScope', '$scope', 'AuthService', function($rootScope, $scope, AuthService) {
			$scope.title = 'loggedout.Node';
			$rootScope.userProfile = AuthService.getUserProfile();
			$scope.loggedoutForm = {display: true};
		}]);
});