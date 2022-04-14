var express = require("express");
var app = express();
var http = require("http");
var cors = require("cors");
const { isObject } = require("util");
const tls = require('tls');


require('dotenv').config()

//var server = http.createServer(app);
var server = http.createServer({
    secureOptions: require('constants').SSL_OP_NO_TLSv1,
    //pfx: fs.readFileSync(path.resolve(pathToCert))
}, app);

var router = require('./router/routers');


app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/axios/dist'));
app.use(express.static(__dirname + '/node_moddules'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static('public'));

app.set('view engine' , 'ejs');
app.use(cors());

app.use(express.urlencoded({extended : true}));
app.use(express.json());
//console.log(tls)
tls.DEFAULT_MIN_VERSION = "TLSv1"; //Altera a versão minima do tls.
//console.log(tlsSocket.getCipher())
app.use('/', router);

server.listen(8283,()=>{
    console.log("Servidor no ar");
})