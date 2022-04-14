var knex = require('./../database/connection');

class Token {

    async tokenSave(params) {
        return knex('blacklist_token').insert(params)

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

    async tokenFind(params) {
        try {
            var result = await knex.select().from('blacklist_token')
                .andWhere({
                    token: params
                })
                .orderBy('token');

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
}

module.exports = new Token();