
define (['./module'], function(controllers) {
	controllers
		.controller('logoutController',
			['$rootScope', '$scope', '$route', '$location', 'AuthService',
			function($rootScope, $scope, $route, $location, AuthService) {
				$scope.title = 'logout.Node';

				$scope.logoutForm = {
					display: true
				};

				$scope.logout = function () {

					// call register from service
					AuthService.logout()
						// handle success
						.then(function () {
							$rootScope.$broadcast('userLoggedOut');

							$rootScope.userProfile = null;
							$location.path('/loggedout');
							$route.reload();
						})
						// handle error
						.catch(function () {
							$scope.logoutForm = {display: true};
						});
				};

				$scope.logout();
			}]);
});