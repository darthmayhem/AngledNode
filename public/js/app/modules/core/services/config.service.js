/**
 * Created by Steve on 3/11/2016.
 */

define (['./module'], function(services) {
    services
        .factory('ConfigService',
            ['$q', '$timeout', '$http',
            function ($q, $timeout, $http) {
                var config = {};

                var getConfig = function() {
                    $http.get('/api/app/config')
                        // handle success
                        .success(function (data) {
                            config.appName = data.appName;
                            config.appVersion = data.appVersion;
                        })
                        // handle error
                        .error(function () {
                            config.appName = "";
                            config.appVersion = "";
                        });

                    return config;
                }

                // return available functions for use in the controllers
                return ({
                    getConfig: getConfig,
                });
        }])

        .run(['$log', function($log) {
            $log.info('config.service: initialized');
        }]);
});
