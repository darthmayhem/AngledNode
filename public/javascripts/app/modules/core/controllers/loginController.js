

define(function() {
	angular
		.module('coreModule')
		.controller('loginController', ['$scope', function($scope) {
			$scope.title = 'login.Node';
		}]);
});