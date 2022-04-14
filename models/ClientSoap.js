const { get } = require('express/lib/request');
const securityCelepar = require('./../controllers/VariavelAmbiente');
var soap = require('soap');

module.exports = class ClientSoap {

    async clientSoap() {
        const getSecurityCelepar = {
            login: securityCelepar.login,
            password: securityCelepar.password
        };

        var url = 'https://soap.workflow.pr.gov.br/sopr/soap.sopr.auth.php?wsdl';

        const security = new soap.BasicAuthSecurity(getSecurityCelepar.login, getSecurityCelepar.password);
        const wsdl_headers = {}

        security.addHeaders(wsdl_headers);
        return soap.createClientAsync(url, { wsdl_headers }).then((client, err) => {

            if (client) {
                client.setSecurity(new soap.BasicAuthSecurity(getSecurityCelepar.login, getSecurityCelepar.password));
                return client

            } else {
                console.log(err);
                return err
               
            }
        });

    }
}

