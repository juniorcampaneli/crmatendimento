var axios = require('axios');
const { render } = require('express/lib/response');
var Atendimento = require('./../models/CrmAtendimento');
var Cliente = require('./../models/CrmClientes');
var City = require('./../models/LocalidadesBrasil');


class HomeController {
    async index(req, res) {
        res.render("index", {
            numProtocolo: '',
            numDocumento: '',
            numTelefone: '',
            callId: '',
            status: '',
            cliente: {},
            historico: {},
            cidades: {},
            token:''
        });
    }

    async atendimento(req, res) {
        let callId = req.query.callId ? req.query.callId : '';
        let telefoneCliente = req.query.telefoneCliente ? req.query.telefoneCliente : '';
        let numProtocolo = req.query.numProtocolo ? req.query.numProtocolo : '';
        let numDocumento = req.query.numDocumento ? req.query.numDocumento : '';
        let numToken = req.query.token ? req.query.token : '';
        let resultCliente = '';
        let resultAtendimento = '';


        if (numToken.length > 0) {
            if (telefoneCliente.length > 0) {

                if (callId.length > 0) {
                    resultCliente = await Cliente.findClient(telefoneCliente);

                    if (resultCliente.status == "200") {

                        resultAtendimento = await Atendimento.findAtendimento(resultCliente.msg[0].id);

                        if (resultAtendimento.status == "404") {
                            resultAtendimento = '';
                        }

                    }

                } else {
                    res.status(400).json("Informe o callId da chamada.");

                }

            } else {
                res.status(400).json("Informe o número de telefone.");

            }
        }else{
            res.status(400).json("Token informado é inválido ou não informado.");
        }


        let cidades = await City.findCity("Pr");

        res.render("index", {
            numProtocolo: numProtocolo,
            numDocumento: numDocumento,
            numTelefone: telefoneCliente,
            callId: callId,
            status: '',
            cliente: resultCliente,
            historico: resultAtendimento,
            cidades: cidades,
            token: numToken
        })
    }


}

module.exports = new HomeController();