conarcApp.controller('confirmRegisterController', function confirmRegisterController($scope, $location, $routeParams, InscricaoService, $sce, blockUI) {
    var confirmRegisterController = $scope;
    blockUI.start();

    InscricaoService.findNomeById($routeParams.inscricaoId).then(function (data) {
        confirmRegisterController.inscricao = data;
        InscricaoService.findBotaoById($routeParams.inscricaoId).then(function (data) {
            confirmRegisterController.inscricao.botao = $sce.trustAsHtml(data.botao);
            blockUI.stop();
        });
    });
});
