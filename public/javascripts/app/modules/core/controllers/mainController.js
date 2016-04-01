
define (function() {
	angular
		.module('coreModule')
		.controller('mainController', ['$rootScope', '$scope', 'ConfigService', 'AuthService', function($rootScope, $scope, ConfigService, AuthService) {
			$scope.config = ConfigService.getConfig();
			$rootScope.userProfile = AuthService.getUserProfile();
		}]);
});