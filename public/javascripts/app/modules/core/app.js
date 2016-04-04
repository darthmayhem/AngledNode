/**
 * Created by steve_haight on 4/4/2016.
 */

define([
    'angular',
    './services/index',
    './controllers/index',
    './filters/index',
    './directives/index',
    './runners/index'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'app.runners'
    ]);
});