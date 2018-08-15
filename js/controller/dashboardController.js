conarcApp.controller('dashboardController', function dashboardController($scope, $location, InscricaoService, $ngBootbox, blockUI, $http, LoginService) {
    var dashBoardController = $scope;

    $scope.logout = function () {
        LoginService.logout();
        $location.path("/");
    }

    $scope.inscricaoList = [];

    InscricaoService.findInscricaoList().then(function (data) {
        data.forEach(function (data) {
            data.dt_inscricao = new Date(data.dt_inscricao);
        })
        dashBoardController.inscricaoList = data;

    })

    $scope.goToDetails = function (id) {
        $location.path('/inscricaoDetails').search({'inscricaoId': id});
    }
});
