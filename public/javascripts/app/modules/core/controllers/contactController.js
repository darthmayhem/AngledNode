

define(function() {
	angular
		.module('coreModule')
		.controller('contactController', ['$scope', 'AuthService', function($scope, AuthService) {
			$scope.title = 'contact.Node';
			$scope.user = AuthService.getUserProfile();
			$scope.contactForm = {display: true};
		}]);
});