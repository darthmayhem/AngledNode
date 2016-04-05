/**
 * Created by steve_haight on 4/4/2016.
 */

define([
    'angular',
    'angular-route',
    './core/services/index',
    './core/controllers/index',
    //'./core/filters/index',
    './core/directives/index'
    //'./core/runners/index'
], function (ang) {
    'use strict';

    return ang.module('app', [
        'ngRoute',
        //'ngMaterial',
        'app.services',
        'app.controllers',
        //'app.filters',
        'app.directives',
        //'app.runners'
    ]);
});