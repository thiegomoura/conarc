var InscricaoService = angular.module('InscricaoService', [])
InscricaoService.factory('InscricaoService', ['$http', function ($http) {

        function toUnderscoreCase(s) {
            return s.replace(/\.?([A-Z])/g, function (x, y) {
                return "_" + y.toLowerCase()
            }).replace(/^_/, "");
        }


        InscricaoService.save = function (inscricao) {
            data = {}
            for (var name in inscricao) {
                data[name] = inscricao[name];
            }

            return $http({
                method: 'POST',
                url: 'inscricao/save_inscricao.php',
                data: data
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        InscricaoService.findById = function (id) {
            return $http({
                method: 'GET',
                url: 'inscricao/find_inscricao.php?id=' + id,
                cache: false
            }).then(function successCallback(response) {
                var inscricao = {};
                inscricao.id = response.data.id;
                inscricao.nome = response.data.nome;
                inscricao.nomeCracha = response.data.nomeCracha;
                inscricao.email = response.data.email;
                inscricao.rg = response.data.rg;
                inscricao.cpf = response.data.cpf;
                inscricao.distrito = response.data.distrito;
                inscricao.clube = response.data.clube;
                inscricao.telefone = response.data.telefone;
                inscricao.tipoSanguineo = response.data.tipoSanguineo;
                inscricao.nomeContatoEmergencia = response.data.nomeContatoEmergencia;
                inscricao.telefoneContatoEmergencia = response.data.telefoneContatoEmergencia;
                inscricao.formaPagamento = response.data.formaPagamento;
                inscricao.nrParcelas = response.data.nrParcelas;
                inscricao.dtInscricao = response.data.dtInscricao;
                inscricao.situacaoPagamento = response.data.situacaoPagamento;
                inscricao.restricaoAlimentar = response.data.restricaoAlimentar;
                inscricao.alergiaOutrasRestricoes = response.data.alergiaOutrasRestricoes;
                inscricao.planoSaude = response.data.planoSaude;
                inscricao.aceitaNewsletter = response.data.aceitaNewsletter;
                inscricao.possuiColchao = response.data.possuiColchao;
                inscricao.necessidadesEspeciais = response.data.necessidadesEspeciais;
                inscricao.dtNascimento = response.data.dtNascimento;

                return inscricao;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        InscricaoService.findNomeById = function (id) {
            return $http({
                method: 'GET',
                url: 'inscricao/find_nome_inscricao.php?id=' + id,
                cache: false
            }).then(function successCallback(response) {
                var inscricao = {};
                inscricao.nome = response.data.nome;
                return inscricao;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        InscricaoService.findBotaoById = function (id) {
            return $http({
                method: 'GET',
                url: 'inscricao/find_botao.php?id=' + id,
                cache: false
            }).then(function successCallback(response) {
                var inscricao = {};
                inscricao.botao = response.data;
                return inscricao;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        InscricaoService.findPermiteInscricao = function () {
            return $http({
                method: 'GET',
                url: 'inscricao/find_permite_inscricao.php',
                cache: false
            }).then(function successCallback(response) {
                return response.data.permiteInscricao;
            }, function errorCallback(response) {
                console.log(response);
                return false;
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        InscricaoService.findInscricaoList = function () {
            return $http({
                method: 'GET',
                url: 'inscricao/find_inscricoes.php',
                cache: false
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                console.log(response);
                return false;
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        InscricaoService.findInscricaoCurrentUser = function () {
            return $http({
                method: 'GET',
                url: 'inscricao/find_inscricao_current_user.php',
                cache: false
            }).then(function successCallback(response) {
                var inscricao = {};
                inscricao.id = response.data.id;
                inscricao.nome = response.data.nome;
                inscricao.nomeCracha = response.data.nomeCracha;
                inscricao.email = response.data.email;
                inscricao.rg = response.data.rg;
                inscricao.cpf = response.data.cpf;
                inscricao.distrito = response.data.distrito;
                inscricao.clube = response.data.clube;
                inscricao.telefone = response.data.telefone;
                inscricao.tipoSanguineo = response.data.tipoSanguineo;
                inscricao.nomeContatoEmergencia = response.data.nomeContatoEmergencia;
                inscricao.telefoneContatoEmergencia = response.data.telefoneContatoEmergencia;
                inscricao.formaPagamento = response.data.formaPagamento;
                inscricao.nrParcelas = response.data.nrParcelas;
                inscricao.dtInscricao = response.data.dtInscricao;
                inscricao.situacaoPagamento = response.data.situacaoPagamento;
                inscricao.restricaoAlimentar = response.data.restricaoAlimentar;
                inscricao.alergiaOutrasRestricoes = response.data.alergiaOutrasRestricoes;
                inscricao.planoSaude = response.data.planoSaude;
                inscricao.aceitaNewsletter = response.data.aceitaNewsletter;
                inscricao.possuiColchao = response.data.possuiColchao;
                inscricao.necessidadesEspeciais = response.data.necessidadesEspeciais;
                inscricao.dtNascimento = response.data.dtNascimento;
                return inscricao;
            }, function errorCallback(response) {
                console.log(response);
                return {};
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        return InscricaoService;
    }]);