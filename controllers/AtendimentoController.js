
class AtendimentoController {

    constructor() {
        this.locale = "pt-BR";
        this._currentDate;
        // this.currentTime;
        this._displayCurrentDate = document.querySelector("#currentDate");
        this._displayCurrentTime = document.querySelector("#currentTime");
        this.initialize();
        this.initButtonsEvents();


    }

    //Metodo principal
    initialize() {
        setInterval(() => {
            this.displayCurrentDate = this.currentDate.toLocaleDateString(this.locale);
            this.displayCurrentTime = this.currentDate.toLocaleTimeString(this.locale);
        }, 1000);

        this.inputs = document.querySelectorAll(".input--style-1, .inputs, .input--pesquisar");
        this.select = document.getElementById('cidades');

    }


    execBtn(value) {
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
            keyboard: false
        })

        switch (value) {

            case 'salvar':
                let inputValues = {};
                this.inputs.forEach(input => {
                    if (input.name.indexOf("modal-") == -1) {
                        inputValues[input.name] = input.value;

                    }

                })
                inputValues["localidade"] = this.select.options[this.select.selectedIndex].text

                this.setAxiosActions(
                    'http://localhost:8283/crmAtendimentoCtd/histAtendimento/',
                    'post',
                    {},
                    inputValues,
                    myModal
                );

                break;

            case 'salvar-modal':
                let inputTextArea = {};
                this.inputs.forEach(input => {
                    //console.log(input)
                    if (input.name == "modal-descricaoAtend" || input.name == "modal-id") {
                        let nameParams = input.name.replace('modal-', '');
                        inputTextArea[nameParams] = input.value;
                    }
                })

                inputTextArea['dataHora'] = `${this.displayCurrentDate}  ${this.displayCurrentTime}`;

                //console.log(inputTextArea)
                this.setAxiosActions(
                    'http://localhost:8283/crmAtendimentoCtd/histAtendimento/',
                    'put',
                    {},
                    inputTextArea,
                    myModal
                );
                break;

            case 'abrirOs':
                this.setAxiosActions(
                    'http://localhost:8283/crmAtendimentoCtd/celepar/os/',
                    'get',
                    {},
                    {},
                    myModal
                );
                break;

            case 'pesquisar':
                console.log("pesquisar");
                break;

            default:
                //console.log(this.inputs);
                var config = {
                    method: 'get',
                    url: 'http://localhost:8283/crmAtendimentoCtd/histAtendimento/' + value,
                    headers: {}
                };

                axios(config)
                    .then(function (response) {
                        var inputs = document.querySelectorAll(".input--style-1, .inputs, .input--pesquisar");

                        inputs.forEach(input => {

                            switch (input.id) {
                                case "modal-id":
                                    input.value = response.data[0].id;
                                    break;

                                case "modal-nome":
                                    input.value = response.data[0].nome;
                                    break;

                                case "modal-numDocumento":
                                    input.value = response.data[0].numDocumento;
                                    break;

                                case "modal-email":
                                    input.value = response.data[0].email;
                                    break;

                                case "modal-numTelefoneContato":
                                    input.value = response.data[0].numTelefoneContato;
                                    break;

                                case "modal-localidade":
                                    input.value = response.data[0].localidade;
                                    break;

                                case "modal-descricaoAtend":
                                    let description = response.data[0].descricaoAtend;
                                    //description = description + '*****************************************************************************\n';
                                    input.value = description;
                                    break;

                            }
                        });

                    })
                    .catch(function (error) {
                        myModal.show()

                        var title = document.getElementById("title-modal-msg");
                        title.classList.add("text-danger");
                        title.innerText = "Error Status: Erro Generico ";

                        var message = document.getElementById("message-modal-msg");
                        message.innerText = "Informar a Supervisão.";
                        console.log(error);
                    });
        }
    }

    setAxiosActions(url, method, headers, data, modal) {
        var config = {
            method: method,
            url: url,
            headers: headers,
            data: data
        };


        axios(config)
            .then(function (response) {

                //console.log(response.data.status)
                if (response.data.status == '200') {

                    window.location.href = "http://localhost:8283/"

                } else {

                    modal.show()

                    var title = document.getElementById("title-modal-msg");
                    title.classList.add("text-danger");
                    title.innerText = "Error Status: " + response.data.status;

                    var message = document.getElementById("message-modal-msg");
                    message.innerText = response.data.msg;
                }

            })
            .catch(function (error) {
                modal.show()

                var title = document.getElementById("title-modal-msg");
                title.classList.add("text-danger");
                title.innerText = "Error Status: " + error.response.data.status;

                var message = document.getElementById("message-modal-msg");
                message.innerText = error.response.data.msg;


            });
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll(".buttons");

        buttons.forEach(btn => {

            btn.addEventListener("click", e => {
                e.preventDefault();
                console.log(btn.id)
                let textBtn = btn.id.replace("btn-", "");

                this.execBtn(textBtn);
            });

        });

    }


    get displayCurrentDate() {
        return this._displayCurrentDate.value;
    }

    set displayCurrentDate(v_value) {
        this._displayCurrentDate.value = v_value
    }

    get displayCurrentTime() {
        return this._displayCurrentTime.value;
    }

    set displayCurrentTime(v_value) {
        this._displayCurrentTime.value = v_value
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(v_value) {
        this._currentDate = v_value;
    }

}
