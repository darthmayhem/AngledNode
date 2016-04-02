
define(function() {
	angular
		.module('coreModule')
		.controller('registerController',
			['$rootScope', '$scope', '$location', 'AuthService',
			function($rootScope, $scope, $location, AuthService) {
				$scope.title = 'register.Node';

				$rootScope.userProfile = AuthService.getUserProfile();

				$scope.registerForm = {
					display: true,
					username: '',
					password: '',
					email: ''
				};

				$scope.register = function () {

					// initial values
					$scope.error = false;

					// call register from service
					AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.email)
						// handle success
						.then(function () {
							$location.path('/profile');
						})
						// handle error
						.catch(function (err) {
							$scope.error = true;
							$scope.errorMessage = "Register error: " + err;
							$scope.registerForm.display = true;
						});
				};
			}])
});