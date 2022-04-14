var moment = require("moment");
const knex = require ('knex')({
    client: 'mysql2',
    connection: {
        host: '10.0.2.9',
        user: 'ura',
        password: 'ask123',
        database: 'crm_ctd',
        charset  : 'utf8',
        timezone     : 'america/sao_paulo',
        typeCast: function (field, next) {
            if (field.type == 'DATETIME') {
              return moment(field.string()).format('DD/MM/YYYY HH:mm:ss');
            }
            return next();
          }
    }
});

module.exports = knex;