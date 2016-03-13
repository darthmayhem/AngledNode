

define(function() {
	angular
		.module('coreModule')
		.controller('logoutController',
			['$scope', '$location', 'AuthService',
			function($scope, $location, AuthService) {
				$scope.title = 'logout.Node';

				$scope.user = AuthService.getUserProfile();

				$scope.logoutForm = {
					display: true
				};

				$scope.logout = function () {

					// call register from service
					AuthService.logout()
						// handle success
						.then(function () {
							$location.path('/');
							$scope.logoutForm = {display: true};
						})
						// handle error
						.catch(function () {
							$scope.logoutForm = {display: true};
						});

					$scope.user = AuthService.getUserProfile();
				};

				$scope.logout();
			}]);
});