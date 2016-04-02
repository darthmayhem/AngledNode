

require.config({
	paths: {
		//resource files
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
		'angular': '../../components/angular/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
		
		//load modules
		'coreModule': 'core/coreModule',
		'authModule': 'core/services/auth.service',
		'configModule': 'core/services/config.service',
        'menuModule': 'core/services/menu.service',
        'themeModule':  'theme/theme',

        //load directives
        'password.directive':  'core/directives/password.directive'
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

		'coreModule': { deps: [
            'angular-route',
            //'angular',
            'password.directive',
            'themeModule',
            'authModule',
            'menuModule',
            'configModule'
        ] }
	}
});

require(['coreModule'], function(coreModule) {
	//load the application
})