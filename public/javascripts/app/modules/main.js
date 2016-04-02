

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
		'directivesModule':  'directives/password.directive',
		'themeModule':  'theme/theme'
	},
	
	shim: {
		'bootstrap': { deps: [ 'jquery' ] },
		'angular': { deps: [ 'bootstrap' ] },
		'angular-route': { deps: [ 'angular' ] },
		
		'themeModule': { deps: [ 'angular' ] },
		'directivesModule': { deps: [ 'angular' ] },
		'authModule': { deps: [ 'angular' ] },
		'configModule': { deps: [ 'angular' ] },
		'coreModule': { deps: [ 'angular-route', 'directivesModule', 'themeModule', 'authModule', 'configModule' ] }
	}
});

require(['coreModule'], function() {
	//load the application
})