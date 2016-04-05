
define (['./module'], function(controllers) {
	controllers
		.controller('loginController',
			['$rootScope', '$scope', '$location', 'AuthService',
			function($rootScope, $scope, $location, AuthService) {
				$scope.title = 'login.Node';

				$rootScope.userProfile = AuthService.getUserProfile();

				$scope.loginForm = {
					display: true,
					username: '',
					password: ''
				};

				$scope.login = function () {
					// initial values
					$scope.error = false;
					$scope.disabled = true;

					// call register from service
					AuthService.login($scope.loginForm.username, $scope.loginForm.password)
						// handle success
						.then(function () {
							$rootScope.$broadcast('userLoggedIn');

							$location.url('/');
						})
						// handle error
						.catch(function (err) {
							$scope.error = true;
							$scope.errorMessage = "Login error: " + err.message;
							$scope.disabled = false;
							$scope.loginForm = {display: true};
						});
				};
			}]);
});