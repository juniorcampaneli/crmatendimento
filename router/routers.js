var express = require('express');
var app = express();
var router = express.Router();
var controllerIndex = require("../controllers/HomeController")
var histAtendimento = require("../controllers/HistoricoAtendController")
var celeparOs = require("./../controllers/CeleparController")
var token = require("../controllers/TokenController")
const {eAdmin} = require('./../middleware/auth')

router.get('/', controllerIndex.index);

router.get('/crmAtendimentoCtd/', controllerIndex.atendimento);

router.get('/crmAtendimentoCtd/histAtendimento/:id', histAtendimento.findHistId);

router.post('/crmAtendimentoCtd/histAtendimento/',eAdmin, histAtendimento.saveAtendimento);
//router.post('/crmAtendimentoCtd/histAtendimento/', histAtendimento.saveAtendimento);

router.get('/crmAtendimentoCtd/celepar/os/', celeparOs.inserirAnotacao);

router.get('/crmAtendimentoCtd/tokenAtendimento_/', token.newToken);

module.exports = router;

