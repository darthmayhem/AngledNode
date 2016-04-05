

require.config({
    paths: {
        //'jquery': '../../components/jquery/jquery.min',
        //'bootstrap': '../../components/bootstrap-3.3.6-dist/js/bootstrap.min',
        'domReady': '../../components/requirejs-domready/domReady',
        'ui.bootstrap': '../../components/angular-bootstrap/ui-bootstrap.min',
        'angular': '../../components/angular/angular.min',
        'angular-route': '../../components/angular-route/angular-route.min'
    },

    shim: {
        //'bootstrap': { deps: [ 'jquery' ] },
        'angular': { exports: 'angular' },
        'ui.bootstrap': { deps: ['angular'] },
        'angular-route': { deps: [ 'angular' ], exports: 'angular-route'}
    },

    // start the app
    deps: ['./bootstrap']
});