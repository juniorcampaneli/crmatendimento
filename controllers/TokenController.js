var jwt = require('jsonwebtoken');
const numberKey = require('./VariavelAmbiente');

class TokenController{
   
    async newToken(req, res){
       
        let token = jwt.sign({date:Date.now()}, numberKey.key_token,{
            expiresIn:300
        });

        res.status(200).json({token})
    }
}

module.exports = new TokenController();