

define(function() {
	angular
		.module('coreModule')
		.controller('profileController', ['$scope', 'AuthService', function($scope, AuthService) {
			$scope.title = 'profile.Node';

			$scope.user = AuthService.getUserProfile();

			$scope.profileForm = {
				display: true,
				username: AuthService.getUserProfile().username,
				email: AuthService.getUserProfile().email,
				firstname: AuthService.getUserProfile().firstname,
				lastname: AuthService.getUserProfile().lastname
			};

			$scope.saveProfile = function() {
				AuthService.saveUserProfile($scope.profileForm);
				$scope.statusmessage = "profile updated";
			}
		}]);
});