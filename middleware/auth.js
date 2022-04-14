const jwt = require('jsonwebtoken');
const numberKey = require('./../controllers/VariavelAmbiente');
const { promisify } = require('util');
const { tokenFind, tokenSave } = require('./../models/Token');


module.exports = {
    eAdmin: async function (req, res, next) {
        const token = req.body.token;
        const callid = req.body.idChamada;
        
       
        try {

            const decode = await promisify(jwt.verify)(token, numberKey.key_token);
            
            const result = await tokenFind(token);
            //console.log(result)
            if(result.status == 'error'){
                return res.status(400).json({
                    status:result.status,
                    msg:result.msg
                })
            }else if (result.status == '200'){
                console.log("Token já Utilizado.")
                return res.status(400).json({
                    status:'400',
                    msg:'Token Inválido'
                })

            }else{
                const result = await tokenSave({
                    token:token,
                    callid:callid
                })
                console.log(result);
                if (result.status == '200'){
                    return next();
                }else{
                    return res.status(400).json({
                        status:'400',
                        msg:'Token Inválido'
                    })
                }

            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                'status': '400',
                'msg': "Token Inválido."
            })
        }
    }
}