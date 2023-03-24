function entrar() {

    var emailVar = input_emailLogin.value;
    var senhaVar = input_senhaLogin.value;


 
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    });
}