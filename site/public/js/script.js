function verificarLogin() {
    var nomeUser = sessionStorage.NOME_USUARIO;
    var empresaId = sessionStorage.ID_EMPRESA;
    var usuarioId = sessionStorage.ID_USUARIO;


    if (nomeUser != null && empresaId != null && usuarioId != null) {
        spn_usuarioNome.innerHTML = nomeUser;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}
