/**
 * Created by Steve on 3/11/2016.
 */

define(function() {
    var authModule = angular.module('authModule', []);

    authModule.factory('AuthService',
        ['$q', '$timeout', '$http', '$log',
        function ($q, $timeout, $http, $log) {
            // create user variable
            var user = null;

            var isLoggedIn = function() {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            }

            var getUserStatus = function() {
                return user;
            }

            var login = function(username, password) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            var logout = function() {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            var register = function(username, password, email) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/register',
                    {username: username, password: password, email: email})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;
            }

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });
    }]);

    authModule.run(['$log', function($log) {
        $log.info('Initialized the authModule');
    }]);
});

