conarcApp.controller('inscricaoDetailsController', function inscricaoDetailsController($scope, $location, InscricaoService, $ngBootbox, blockUI, $routeParams, $sce) {
    var dashBoardController = $scope;

    $scope.goBack = function () {
        $location.path("/dashboard");
    }

    $scope.inscricao = {};

    blockUI.start();
    InscricaoService.findById($routeParams.inscricaoId).then(function (data) {
        dashBoardController.inscricao = data;
        dashBoardController.inscricao.dtInscricao = new Date(dashBoardController.inscricao.dtInscricao);
        InscricaoService.findBotaoById($routeParams.inscricaoId).then(function (data) {
            dashBoardController.inscricao.botao = $sce.trustAsHtml(data.botao);
            blockUI.stop();
        });
    });
});
