

require.config({
	paths: {
		'jquery': '../../components/jquery/jquery.min',
		'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
		'angular': '../../components/angular/angular.min',
		'angular-route': '../../components/angular-route/angular-route.min',
        'controllers': './core/references/controller.references',
        'services': './core/references/service.references',
        'directives': './core/references/directive.references',
        'runners': './core/references/runner.references',
        'theme': './theme/theme',
        'core': './core/core'
	},
	
	shim: {
        'bootstrap': { deps: [ 'jquery' ] },
        'angular': { deps: [ 'bootstrap' ] },
        'angular-route': { deps: [ 'angular' ]},

        'controllers': { deps: [ 'angular' ] },
        'services': { deps: [ 'angular' ] },
        //'directives': { deps: [ 'angular' ] },
        //'runners': { deps: [ 'angular' ] },
        //'theme': { deps: [ 'angular' ] },
        'core': {
            deps: [
                'angular-route'
            ],
            exports: 'core'
        }
	}
});

require(['core'], function (core) {
	core.init();
});
