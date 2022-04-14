var knex = require('./../database/connection');

var table = "clientes";
class CrmClientes {
    async findClient(phoneNumber) {
        try {
            var result = await knex.select().from(table)
                .andWhere({
                    numTelefone: phoneNumber
                })
                .orderBy("numTelefone");

            if (result.length > 0) {
                //return result;
                return result = {
                    status: '200',
                    msg: result
                };
            } else {
                return result = {
                    status: '404',
                    msg: "Not Found"
                };
            }
        } catch (error) {
            console.log(error);
            return result = {
                status: 'error',
                msg: error.message
            }

        }
    }

    async saveClient(params) {
        return knex(table).insert(params)
       
            .then((response) => {
                 
                return {
                    'status': '200',
                    'msg': response
                }
            })
            .catch((error) => {
                return {
                    'status': 'error',
                    'msg': error.sqlMessage
                }
            });

    }

    async updateClient(params, paramsId) {
        return knex(table).where('id', '=', paramsId).update(params)
            .then((response) => {
                console.log(response)
                if (response == 0) {
                    return {
                        'status': '404',
                        'msg': 'Not Found'
                    }
                } else {
                    return {
                        'status': '200',
                        'msg': response
                    }
                }
            })
            .catch((error) => {
                return {
                    'status': 'error',
                    'msg': error.sqlMessage
                }
            });

    }
}

module.exports = new CrmClientes()