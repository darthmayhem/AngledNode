
define (['./module'], function(controllers) {
	controllers
		.controller('mainController', [
			'$scope',
			'$location',
			'MenuService',
			'ConfigService',
			'AuthService',

			function($scope, $location, MenuService, ConfigService, AuthService) {
				$scope.config = ConfigService.getConfig();
				$scope.userProfile = AuthService.getUserProfile();

				$scope.$on('userLoggedIn', function () {
					console.log('user logged in');
				});

				$scope.$on('userLoggedOut', function () {
					console.log('user logged out');
				});

				var vm = this;
				//var aboutMeArr = ['Family', 'Location', 'Lifestyle'];
				//var budgetArr = ['Housing', 'LivingExpenses', 'Healthcare', 'Travel'];
				//var incomeArr = ['SocialSecurity', 'Savings', 'Pension', 'PartTimeJob'];
				//var advancedArr = ['Assumptions', 'BudgetGraph', 'AccountBalanceGraph', 'IncomeBalanceGraph'];

				//functions for menu-link and menu-toggle
				vm.isOpen = isOpen;
				vm.toggleOpen = toggleOpen;
				vm.autoFocusContent = false;
				vm.MenuService = MenuService;

				vm.status = {
					isFirstOpen: true,
					isFirstDisabled: false
				};

				function isOpen(section) {
					return MenuService.isSectionSelected(section);
				}

				function toggleOpen(section) {
					MenuService.toggleSelectSection(section);
				}

			}]);
});