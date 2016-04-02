

require.config({
	paths: {
		//resource files
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
		'angular': '../../components/angularjs/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
		
		//load modules
		'coreModule': 'core/coreModule',
		'authModule': 'core/services/auth.service',
		'configModule': 'core/services/config.service',
        'menuModule': 'core/services/menu.service',
        'themeModule':  'theme/theme',

        //load directives
        'menulink.directive':  'directives/menu_link.directive',
        'menutoggle.directive':  'directives/menu_toggle.directive',
        'password.directive':  'directives/password.directive'
	},
	
	shim: {
		'bootstrap': { deps: [ 'jquery' ] },
		'angular': { deps: [ 'bootstrap' ] },
		'angular-route': { deps: [ 'angular' ] },
		
		'themeModule': { deps: [ 'angular' ] },
		'authModule': { deps: [ 'angular' ] },
		'configModule': { deps: [ 'angular' ] },
        'menuModule': { deps: [ 'angular' ] },

        'password.directive': { deps: [ 'angular' ] },
        'menulink.directive': { deps: [ 'angular' ] },
        'menutoggle.directive': { deps: [ 'angular' ] },

		'coreModule': { deps: [
            'angular-route',
            'menulink.directive',
            'menutoggle.directive',
            'password.directive',
            'themeModule',
            'authModule',
            'menuModule',
            'configModule'
        ] }
	}
});

require(['coreModule'], function() {
	//load the application
})