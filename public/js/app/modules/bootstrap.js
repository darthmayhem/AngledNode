/**
 * Created by steve_haight on 4/4/2016.
 *
 * bootstraps angular onto the window.document node
 */

define([
    'require',
    'angular',
    'angular-route',
    'app',
    'routes',
    'ui.bootstrap'
], function (require, ang) {
    'use strict';

    require(['domReady!'], function (document) {
    //require(function () {
        ang.bootstrap(document, ['app']);
    });
});