

require.config({
	paths: {
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
		'angular': '../../components/angular/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
		'coreModule': './core/core'
	},
	
	shim: {
		'jquery': { exports: '$'},
		'bootstrap': { deps: [ 'jquery' ], exports: 'bootstrap' },
		'angular': { deps: [ 'bootstrap' ], exports: 'angular' },
		'angular-route': { deps: [ 'angular' ], exports: 'angular' }
	}
});

require(['core/core'], function (core) {
	core.init();
});