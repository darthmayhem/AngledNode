

define(function() {
	angular
		.module('coreModule')
		.controller('profileController', ['$scope', function($scope) {
			$scope.title = 'profile.Node';
			$scope.username = 'username';
			$scope.firstname = 'firstname';
			$scope.lastname = 'lastname';
		}]);
});