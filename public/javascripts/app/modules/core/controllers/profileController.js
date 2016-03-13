

define(function() {
	angular
		.module('coreModule')
		.controller('profileController', ['$scope', 'AuthService', function($scope, AuthService) {
			$scope.title = 'profile.Node';

			$scope.user = AuthService.getUserProfile();

			$scope.profileForm = {
				display: true
			};
		}]);
});