
define(function() {
	angular
		.module('coreModule')
		.controller('logoutController',
			['$rootScope', '$scope', '$location', 'AuthService',
			function($rootScope, $scope, $location, AuthService) {
				$scope.title = 'logout.Node';

				$scope.logoutForm = {
					display: true
				};

				$scope.logout = function () {

					// call register from service
					AuthService.logout()
						// handle success
						.then(function () {
							$rootScope.userProfile = null;
							$location.path('/loggedout');
						})
						// handle error
						.catch(function () {
							$scope.logoutForm = {display: true};
						});
				};

				$scope.logout();
			}]);
});