conarcApp.controller('loginController', function loginController($scope, $location, $ngBootbox, LoginService, $http, jwtHelper) {
    $scope.welcome = 'Bem Vindo';


    $scope.register = function () {
        $location.path('/register')
    }

    $scope.login = function () {

        LoginService.login($scope.email, $scope.password).then(function (data) {
            if (data === undefined || data === null || data === {}) {
                $ngBootbox.alert('Ocorreu um erro inesperado no servidor, tente novamente mais tarde');
                return;
            }
            if (data.error !== undefined) {
                $ngBootbox.alert(data.error);
                return;
            }

            // seta o json que será utilizado em todas as requisições
            // pelo usuario logado
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);

            if (data.tipoUsuario == 1) {
                $location.path('/dashboard')
            } else if (data.tipoUsuario == 2) {
                $location.path('/dashboardParticipante')
            }
        })

    }
});
