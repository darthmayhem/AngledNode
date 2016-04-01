/**
 * Created by Steve on 3/11/2016.
 */

define(function() {
    var authModule = angular.module('authModule', []);

    authModule.factory('AuthService',
        ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            var isLoggedIn = function() {
                return (userProfile == null ? false : true)
            }

            var getUserProfile = function() {
                if (isLoggedIn()) return userProfile;
                
                $http.get('/api/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            userProfile = data.user;
                        } else {
                            userProfile = null;
                        }
                    })
                    // handle error
                    .error(function () {
                        userProfile = null;
                    });

                return userProfile;
            }

            var saveUserProfile = function(user) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/api/user/update',
                    {user: user})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.updated){
                            deferred.resolve("user profile updated");
                        } else {
                            deferred.reject("user profile update failed");
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject("user profile update failed");
                    });

                getUserProfile();

                // return promise object
                return deferred.promise;
            }

            var login = function(username, password) {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/api/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.username){
                            deferred.resolve();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject(data.message);
                    });

                getUserProfile();

                // return promise object
                return deferred.promise;
            }

            var logout = function() {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/api/user/logout')
                    // handle success
                    .success(function () {
                        deferred.resolve();
                    })
                    // handle error
                    .error(function () {
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
                $http.post('/api/user/register',
                    {username: username, password: password, email: email})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.updated){
                            user = true;
                            deferred.resolve();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject(data.message);
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

