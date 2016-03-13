

define(function() {
	angular
		.module('coreModule')
		.controller('registerController',
			['$scope', '$location', 'AuthService',
			function($scope, $location, AuthService) {
				$scope.title = 'register.Node';

				$scope.user = AuthService.getUserProfile();

				$scope.registerForm = {
					display: true,
					username: '',
					password: '',
					email: ''
				};

				$scope.register = function () {

					// initial values
					$scope.error = false;
					$scope.disabled = true;

					// call register from service
					AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.email)
						// handle success
						.then(function () {
							$location.path('/profile');
							$scope.disabled = false;
						})
						// handle error
						.catch(function () {
							$scope.error = true;
							$scope.errorMessage = "Oops...";
							$scope.disabled = false;
						});
				};
			}]);
});