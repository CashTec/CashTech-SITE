let isLoading = false;

function entrar() {
    spn_login.style.display = 'none';
    loadingGif.style.display = 'flex';

    var emailVar = document.getElementById("input_emailLogin").value;
    var senhaVar = document.getElementById("input_senhaLogin").value;

    console.log(emailVar, senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        console.log(resposta);

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.ID_EMPRESA = json.empresa_id;

            });

            window.location.pathname = "mapa-gestor.html"

        } else {

            spn_invalido.style.display = 'block';
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
        spn_login.style.display = 'flex';
        loadingGif.style.display = 'none';
    
    }).catch(function (erro) {
        console.log(erro);
        isLoading = false;

    })

    return false;
}
