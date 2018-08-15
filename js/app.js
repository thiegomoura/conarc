// Define the 'conarcApp' module
conarcApp = angular.module('conarcApp', ["ngRoute", "InscricaoService", "LoginService", "ui.utils.masks", "ngBootbox", 'blockUI', "angular-jwt", "ngMask", "vcRecaptcha"]);

conarcApp.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "login.html",
                controller: "loginController"
            })
            .when("/register", {
                templateUrl: "register.html",
                controller: "registerController"
            })
            .when("/confirmRegister", {
                templateUrl: "confirmRegister.html",
                controller: "confirmRegisterController"
            })
            .when("/dashboard", {
                templateUrl: "dashboard.html",
                controller: "dashboardController",
                data: {
                    requiresLogin: true
                }

            })
            .when("/dashboardParticipante", {
                templateUrl: "dashboardParticipante.html",
                controller: "dashboardParticipanteController",
                data: {
                    requiresLogin: true
                }
            })
            .when("/inscricaoDetails", {
                templateUrl: "inscricao_details.html",
                controller: "inscricaoDetailsController",
                data: {
                    requiresLogin: true
                }
            })
});

// diretiva para mostrar os campos invalidos nos formularios
conarcApp.directive('showErrors', function () {
    return {
        restrict: 'A',
        require: '^form',
        link: function (scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box so we know the property to check
            // on the form controller
            var inputName = inputNgEl.attr('name');

            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function () {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            })
        }
    }
});

// configuração para enviar o token JWT em todos os request
//conarcApp.config(function Config($httpProvider, jwtOptionsProvider) {
//    jwtOptionsProvider.config({
//        tokenGetter: [function ($http, jwtHelper) {
//                var jwt = localStorage.getItem('token');
//                //if (!jwtHelper.isTokenExpired(jwt)){
//                //    return jwt;
//                // }
//                return '';
//            }],
//        unauthenticatedRedirectPath: '/'
//    });
//    $httpProvider.interceptors.push('jwtInterceptor');
//});

conarcApp.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function (jwtHelper, $http) {
        var jwt = localStorage.getItem('token');
        if (jwt === null || jwt === 'null' || jwt === undefined || jwt === 'undefined') {
            return '';
        }
        var refreshToken = localStorage.getItem('refreshToken');
        if (jwtHelper.isTokenExpired(jwt) && refreshToken !== null) {
            // This is a promise of a JWT id_token
            return $http({
                url: 'login/refresh_token.php',
                // This will not send the JWT for this call
                skipAuthorization: true,
                method: 'POST',
                headers: {Authorization: 'Bearer ' + refreshToken},
            }).then(function successCallback(response) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return data.token;
            }, function errorCallback(response) {
                localStorage.setItem('token', null);
                localStorage.setItem('token', null);
                return '';
            });

        } else {
            return jwt;
        }
    }
    $httpProvider.interceptors.push('jwtInterceptor');
})

conarcApp.run(function (authManager) {
    authManager.redirectWhenUnauthenticated();
});