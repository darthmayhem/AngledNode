

define (function() {
	angular
		.module('coreModule')
		.controller('mainController', ['$scope', 'ConfigService', 'AuthService', function($scope, ConfigService, AuthService) {
			$scope.config = ConfigService.getConfig();
			$scope.user = AuthService.getUserProfile();
		}]);
});