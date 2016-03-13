

define(function() {
	angular
		.module('coreModule')
		.controller('loginController',
			['$scope', '$location', 'AuthService',
			function($scope, $location, AuthService) {
				$scope.title = 'login.Node';

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
							$location.path('/profile');
						})
						// handle error
						.catch(function () {
							$scope.error = true;
							$scope.errorMessage = "Oops...";
							$scope.disabled = false;
							$scope.loginForm = {display: true};
						});

					$scope.user = AuthService.getUserProfile();
				};
			}]);
});