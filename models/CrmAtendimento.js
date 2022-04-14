var knex = require('./../database/connection');

var table = "atendimentos";
var tableInnerJoin = "clientes";

class CrmAtendimento {
    async findAtendimento(idNumberClient) {
        try {
            var result = await knex.select().from(table)
                .andWhere({
                    idCliente: idNumberClient
                })
                .orderBy("dataHoraAtend");

            if (result.length > 0) {
                return result;
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


    async findAtendimentoId(idNumberAtendimento) {
        try {
            /* var result = await knex.select('*').from(tableInnerJoin)
             .innerJoin(table, tableInnerJoin+'.id' == table+'.idCliente' )
             .andWhere({
                 'atendimentos.id':idNumberAtendimento
             })
             .orderBy("atendimentos.dataHoraAtend");*/

            var result = await knex(tableInnerJoin)
                .join(table, table + '.idCliente', tableInnerJoin + '.id')
                .select('*')
                .andWhere({
                    'atendimentos.id': idNumberAtendimento
                })
                .orderBy("atendimentos.dataHoraAtend");

            if (result.length > 0) {
                return result;
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

    async saveAtendimento(params) {
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

    async updateAtendimento(params) {
        console.log(params)

        return knex(table)
            .where('id', '=', params.id)
            .update({
                descricaoAtend: params.descricaoAtend+'\n',
                thisKeyIsSkipped: undefined
            })
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
}

module.exports = new CrmAtendimento();