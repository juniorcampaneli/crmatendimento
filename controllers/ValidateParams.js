module.exports = class ValidadeParams {
    constructor(params) {
        this.params = params;
        this.result = {};
    }
 
    validadeParams() {
        const asArray = Object.entries(this.params);
        const filtered = asArray.filter(([key, value]) => key == "nome" || key == "numTelefoneContato"
            || key == "email" || key == "numDocumento" || key == "descricaoAtend" || key == "localidade");
        
        const justStrings = Object.fromEntries(filtered);
        Object.values(justStrings).forEach(el => {
           console.log(el.length)
            if (el.length <= 0) {
                this.result = {
                    status: 'Campo Vazio',
                    msg: 'Preencha os Campos iniciados com *'
                }
                
            }
        })

        return this.result
    }
}

