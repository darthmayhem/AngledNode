
define (['./module'], function(controllers) {
	controllers
		.controller('contactController', ['$rootScope', '$scope', 'AuthService', function($rootScope, $scope, AuthService) {
			$scope.title = 'contact.Node';
			$rootScope.userProfile = AuthService.getUserProfile();
			$scope.contactForm = {display: true};
		}]);
});