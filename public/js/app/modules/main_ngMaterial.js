/**
 * Created by steve_haight on 4/5/2016.
 */

require.config({
    paths: {
        'domReady': '../../components/requirejs-domready/domReady',
        'angular': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js',
        'angular-route': '../../components/angular-route/angular-route.min',
        'angular-animate': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js',
        'angular-aria': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js',
        'angular-messages': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js',
        'angular-material': 'http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.js'
    },

    shim: {
        'angular': { exports: 'angular' },
        'angular-material': { deps: ['angular', 'angular-aria', 'angular-animate', 'angular-messages' ] },
        'angular-route': { deps: [ 'angular' ], exports: 'angular-route'}
    },

    // start the app
    deps: ['./bootstrap']
});
