

require.config({
	paths: {
		//resource files
		'jquery': '../../components/jquery/jquery.min',
		'angular': '../../components/angularjs/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
		
		//load modules
		'coreModule': 'core/coreModule',
		'themeModule':  'theme/themeModule'
	},
	
	shim: {
		'angular': { deps: [ 'jquery' ] },
		'angular-route': { deps: [ 'angular' ] },
		
		'themeModule': { deps: [ 'angular' ] },
		'coreModule': { deps: [ 'angular-route', 'themeModule' ] }
	}
});

require(['coreModule'], function() {
	//load the application
})