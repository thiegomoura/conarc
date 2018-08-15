conarcApp.controller('dashboardParticipanteController', function dashboardParticipanteController($scope, $location, $ngBootbox, blockUI, $http, $sce, InscricaoService, LoginService) {
    var dashboardParticipanteController = $scope;

    $scope.inscricao = {};

    blockUI.start();
    InscricaoService.findInscricaoCurrentUser().then(function (data) {
        dashboardParticipanteController.inscricao = data;
        dashboardParticipanteController.inscricao.dtInscricao = new Date(dashboardParticipanteController.inscricao.dtInscricao);
        InscricaoService.findBotaoById(dashboardParticipanteController.inscricao.id).then(function (data) {
            dashboardParticipanteController.inscricao.botao = $sce.trustAsHtml(data.botao);
            blockUI.stop();
        });
    });

    $scope.logout = function () {
        LoginService.logout();
        $location.path("/");
    }
});
