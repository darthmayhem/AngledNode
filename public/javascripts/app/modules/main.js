

require.config({
	paths: {
		//resource files
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
		'angular': '../../components/angularjs/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
		
		//load modules
		'coreModule': 'core/coreModule',
		'themeModule':  'theme/themeModule'
	},
	
	shim: {
		'bootstrap': { deps: [ 'jquery' ] },
		'angular': { deps: [ 'bootstrap' ] },
		'angular-route': { deps: [ 'angular' ] },
		
		'themeModule': { deps: [ 'angular' ] },
		'coreModule': { deps: [ 'angular-route', 'themeModule' ] }
	}
});

require(['coreModule'], function() {
	//load the application
})