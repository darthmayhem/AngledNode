

require.config({
	paths: {
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
        'domReady': '../../components/domready/ready.min',
		'angular': '../../components/angular/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min'
	},
	
	shim: {
        'bootstrap': { deps: [ 'jquery' ] },
        'angular': { deps: [ 'bootstrap' ], exports: 'angular' },
        'angular-route': { deps: [ 'angular' ], exports: 'angular-route'}
	},

    // start the app
    deps: ['./bootstrap']
});
