conarcApp.controller('registerController', function registerController($scope, $location, InscricaoService, $ngBootbox, blockUI, $http) {

    var registerController = $scope;
    $scope.permiteInscricao = true;
    $scope.vlBoletoParcela = 0;
    $scope.vlTotal = 0;
    InscricaoService.findPermiteInscricao().then(function (data) {
        registerController.permiteInscricao = data;
    });
    var options = {
        message: 'Tem certeza que deseja se inscrever na CONARC 2018?',
        title: 'Confirmação',
        buttons: {
            warning: {
                label: "Não",
                className: "btn-default",
                callback: function () {}
            },
            success: {
                label: "Sim",
                className: "btn-success",
                callback: function () {
                    registerController.saveToDb();
                }
            }
        }
    };
    $scope.saveToDb = function () {

        blockUI.start();
        InscricaoService.save($scope.inscricao).then(function (data) {
            blockUI.stop();
            var isError = false;
            if (data === undefined || data === null || data === {}) {
                $ngBootbox.alert('Ocorreu um erro inesperado no servidor, tente novamente mais tarde');
                isError = true;
                return;
            }

            if (data.error !== undefined) {
                $ngBootbox.alert(data.error);
                isError = true;
                return;
            }
            if (data.id === undefined) {
                $ngBootbox.alert('Ocorreu um erro inesperado no servidor, tente novamente mais tarde');
                isError = true;
                return;
            }
            if (!isError) {
                $location.path('/confirmRegister').search({'inscricaoId': data.id});
            }
        });
    }

    $scope.customConfirmButtons = {
        warning: {
            label: "Não",
            className: "btn-default",
            callback: function () {
            }
        },
        success: {
            label: "Sim",
            className: "btn-success",
            callback: function () {
                registerController.save();
            }
        }
    };
    $scope.inscricao = {}
    $scope.inscricao.aceitaNewsletter = true;
    $scope.populateNomeCracha = function () {
        $scope.inscricao.nomeCracha = $scope.inscricao.nome;
    }

    $scope.save = function () {

        if ($scope.inscricaoForm.$valid) {

            if ($scope.aceitoTermos !== true) {
                $ngBootbox.alert("Você deve ler e aceitar os termos de inscrição");
                return;
            }

            if ($scope.inscricao.email !== $scope.inscricao.confirmacaoEmail) {
                $ngBootbox.alert("Email e confirmação de email devem ser iguais");
                $scope.inscricao.confirmacaoEmail = '';
                return;
            }
            if ($scope.inscricao.formaPagamento == 'B' &&
                    ($scope.inscricao.nrParcelas === undefined ||
                            $scope.inscricao.nrParcelas === '')) {
                $ngBootbox.alert("Número de parcelas deve ser informado para pagamento com boleto");
                return;
            }

            if ($scope.inscricao.captchaToken == undefined || $scope.inscricao.captchaToken == '') {
                $ngBootbox.alert("Você deve fazer a verificação de robô para se inscrever");
                return;
            }


            $ngBootbox.confirm('Tem certeza que deseja se inscrever na CONARC 2018?')
                    .then(function () {
                        registerController.saveToDb();
                    }, function () {
                    });
        } else {
            if ($scope.inscricaoForm.$error.required == undefined && $scope.inscricaoForm.$error.mask == undefined
                    && ($scope.inscricao.captchaToken == undefined || $scope.inscricao.captchaToken == '')) {
                $ngBootbox.alert("Você deve fazer a verificação de robô para se inscrever");
                return;
            }
            $ngBootbox.alert("Há campos inválidos no formulário");
        }
    }

    $scope.goBack = function () {
        $location.path("/");
    }

    $scope.calculateInstallmentValue = function () {
        var nrParcelas = $scope.inscricao.nrParcelas;
        var vlBoletoParcela;
        var vlTotal;

        if (nrParcelas == 1) {
            vlBoletoParcela = '370,00';
            vlTotal = '370,00';
        }
        if (nrParcelas == 2) {
            vlBoletoParcela = '189,63';
            vlTotal = '379,26';
        }
        if (nrParcelas == 3) {
            vlBoletoParcela = '126,41';
            vlTotal = '379,23';
        }
        if (nrParcelas == 4) {
            vlBoletoParcela = '95,00';
            vlTotal = '380,00';
        }
        if (nrParcelas == 5) {
            vlBoletoParcela = '76,50';
            vlTotal = '382,50';
        }
        if (nrParcelas == 6) {
            vlBoletoParcela = '64,17';
            vlTotal = '385,02';
        }
        if (nrParcelas == 7) {
            vlBoletoParcela = '55,36';
            vlTotal = '387,52';
        }
        if (nrParcelas == 8) {
            vlBoletoParcela = '48,75';
            vlTotal = '390,00';
        }
        if (nrParcelas == 9) {
            vlBoletoParcela = '43,61';
            vlTotal = '392,49';
        }

        $scope.vlBoletoParcela = vlBoletoParcela;
        $scope.vlTotal = vlTotal;
    }

});
