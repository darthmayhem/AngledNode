

define(function() {
	angular
		.module('coreModule')
		.controller('registerController',
			['$scope', '$location', 'AuthService',
			function($scope, $location, AuthService) {
				$scope.title = 'register.Node';

				$scope.registerForm = {
					username: '',
					password: '',
					email: '',
				};

				$scope.register = function () {

					// initial values
					$scope.error = false;
					$scope.disabled = true;

					// call register from service
					AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.email)
						// handle success
						.then(function () {
							$location.path('/login');
							$scope.disabled = false;
							$scope.registerForm = {};
						})
						// handle error
						.catch(function (ex) {
							$scope.error = true;
							$scope.errorMessage = "Oops...";
							$scope.disabled = false;
							$scope.registerForm = {};
						});
				};
			}]);
});