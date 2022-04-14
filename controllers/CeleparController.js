const { get } = require('express/lib/request');
const getClientSoap = require("./../models/ClientSoap");
var soap = require('soap');


class CeleparController {

    async inserirAnotacao(req, res) {
        const ClientSoap = new getClientSoap()
        const client = await ClientSoap.clientSoap();
        console.log(client);
        if (client) {
            var params = [];
            params['solicitacaoID'] = '12345-67';
            params['anotacao'] = 'minha anotação';

            client.inserirAnotacao(params, function (err, result) {
                if (err) {

                    console.log(err);
                    console.log('err')
                } else {

                    console.log(result);
                    console.log('certo');

                }

            });

        }
    }



}


module.exports = new CeleparController()

