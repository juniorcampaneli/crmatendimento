const axios = require("axios");

class LocalidadesBrasil {
    async findCity(nameDistrito) {
            var config = {
            method: 'get',
            url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + nameDistrito + '/distritos',
            headers: {}
        };

        return axios(config)
            .then(function (response) {
                let citys = [];

                if (response.data.length > 0) {
                    response.data.forEach((city, index) => {
                        citys.push({
                            'id': index,
                            'nome': city.nome
                        })
                    });
                    return citys.sort((a, b) => a.nome.localeCompare(b.nome));

                } else {
                    return undefined;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
}

module.exports = new LocalidadesBrasil()