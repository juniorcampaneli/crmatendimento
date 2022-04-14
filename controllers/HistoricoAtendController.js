var axios = require('axios');
const { render } = require('express/lib/response');
var Atendimento = require('../models/CrmAtendimento');
var Cliente = require('./../models/CrmClientes');
var Validade = require('./../controllers/ValidateParams');

class HistoricoAtendController {
    async findHistAll(req, res) {
        let resultAtendimento = await Atendimento.findAtendimento(req.params.id);

        if (resultAtendimento.status == "404") {
            resultAtendimento = '';
        }
    }

    async findHistId(req, res) {
        let resultAtendimento = await Atendimento.findAtendimentoId(req.params.id);
        console.log(resultAtendimento)
        res.json(resultAtendimento);
    }


    async saveAtendimento(req, res) {

        var ValidatePar = new Validade(req.body)
        var resultValidate = ValidatePar.validadeParams();
        if(Object.keys(resultValidate).length > 0){
            
            return res.status(400).json ({
                'status': resultValidate.status,
                'msg': resultValidate.msg
            })
        }

        var valueCliente = {};
        let valueAtendimento = {};
        let statusAcao = req.body.status;
        let token = req.body.token;
        let idCliente;
   
        delete req.body.token;
        delete req.body.status;
        Object.keys(req.body).forEach((params) => {

            if (params.toString().trim() == "numProtocolo" || params.toString().trim() == "descricaoAtend" || params.toString().trim() == "idChamada") {
                valueAtendimento[params] = req.body[params];
            } else {
                valueCliente[params] = req.body[params];
            }

        });

        let resultCliente;
       
        if (statusAcao == '200') {
            resultCliente = await Cliente.findClient(valueCliente.numTelefone); 
            idCliente = resultCliente.msg[0].id;
            resultCliente = await Cliente.updateClient(valueCliente, idCliente);

            if (resultCliente.status.toString() == "error" || resultCliente.status.toString() == '404')  {
                res.json({
                    'status': resultCliente.status,
                    'msg': resultCliente.msg
                })
                return
            } 

        }else{
            resultCliente = await Cliente.saveClient(valueCliente);
            idCliente = resultCliente.msg[0];
        }
       
        if (resultCliente.status.toString() == '200'){
            valueAtendimento['idCliente'] = idCliente;
            let resultAtendimento = await Atendimento.saveAtendimento(valueAtendimento);
            
            res.status(200).json ({
                'status': '200',
                'msg': "Processo executado com sucesso."
            })
        }else{
            res.status(400).json({
                'status': resultCliente.status,
                'msg': resultCliente.msg
            })
        }
        
    }

   
}

module.exports = new HistoricoAtendController();