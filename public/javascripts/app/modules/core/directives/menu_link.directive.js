/**
 * Created by Steve on 4/2/2016.
 */

define(function() {
    var menuLink = angular.module('menuModule', []);

    menuLink.run(['$templateCache', '$log', function ($templateCache, $log) {
        $templateCache.put('partials/menu-link.tmpl.html',
            '<md-button ng-class="{\'{{section.icon}}\' : true}" \n' +
            '  ui-sref-active="active" ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
            '  {{section | humanizeDoc}}\n' +
            '  <span class="md-visually-hidden "\n' +
            '    ng-if="isSelected()">\n' +
            '    current page\n' +
            '  </span>\n' +
            '</md-button>\n' +
            '');

        $log.info('menulink.directive: initialized');
    }]);

    menuLink.directive('menuLink', function () {
            return {
                scope: {
                    section: '='
                },
                templateUrl: 'partials/menu-link.tmpl.html',
                link: function ($scope, $element) {
                    var controller = $element.parent().controller();

                    $scope.focusSection = function () {
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                        controller.autoFocusContent = true;
                    };
                }
            };
        })
});