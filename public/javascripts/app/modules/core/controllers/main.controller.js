
define (function() {
	angular
		.module('coreModule')
		.controller('mainController', ['$scope', 'ConfigService', 'AuthService', function($scope, ConfigService, AuthService) {
			$scope.config = ConfigService.getConfig();
			$scope.userProfile = AuthService.getUserProfile();

			$scope.$on('userLoggedIn', function () {
				console.log('user logged in');
			});

			$scope.$on('userLoggedOut', function () {
				console.log('user logged out');
			});
		}]);
});