/**
 * Created by Steve on 3/11/2016.
 */

define(function() {
    var authModule = angular.module('authModule', []);

    authModule.factory('AuthService',
        ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            var isLoggedIn = function() {
                return (user == null ? false : true)
            }

            var getUserProfile = function() {
                $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            user = true;
                            userProfile = data.user;
                        } else {
                            user = false;
                            userProfile = null;
                        }
                    })
                    // handle error
                    .error(function () {
                        user = false;
                        userProfile = null;
                    });

                return userProfile;
            }

            var saveUserProfile = function(user) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/update',
                    {user: user})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.updated){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                getUserProfile();

                // return promise object
                return deferred.promise;
            }

            var login = function(username, password) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
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

                getUserProfile();

                // return promise object
                return deferred.promise;
            }

            var logout = function() {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function () {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function () {
                        user = false;
                        deferred.reject();
                    });

                getUserProfile();

                // return promise object
                return deferred.promise;
            }

            var register = function(username, password, email) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: username, password: password, email: email})
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

            // create user variable
            var user = null;
            var userProfile = null;

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserProfile: getUserProfile,
                saveUserProfile: saveUserProfile,
                login: login,
                logout: logout,
                register: register,
            });
    }]);

    authModule.run(['$log', function($log) {
        $log.info('Initialized the authModule');
    }]);
});

