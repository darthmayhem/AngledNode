
define (['./module'], function(controllers) {
	controllers
		.controller('profileController', ['$rootScope', '$scope', 'AuthService', function($rootScope, $scope, AuthService) {
			$scope.title = 'profile.Node';

            $rootScope.userProfile = AuthService.getUserProfile();

			$scope.profileForm = {
				display: true,
				username: AuthService.getUserProfile().username,
				email: AuthService.getUserProfile().email,
				firstname: AuthService.getUserProfile().firstname,
				lastname: AuthService.getUserProfile().lastname
			};

			$scope.saveProfile = function() {
				AuthService.saveUserProfile($scope.profileForm).then(
					function(success) { $scope.statusmessage = success },
					function(error) { $scope.statusmessage = error }
				);
			}
		}]);
});