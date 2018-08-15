var LoginService = angular.module('LoginService', [])
LoginService.factory('LoginService', ['$http', function ($http) {

        LoginService.login = function (email, password) {
            return $http({
                method: 'POST',
                url: 'login/login.php',
                data: {'email' : email,
                       'password': password}
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        
        LoginService.logout = function(){
            localStorage.setItem('token', null);
        }


        return LoginService;
    }]);