function entrar() {

    var emailVar = input_emailLogin.value;
    var senhaVar = input_senhaLogin.value;

    console.log(emailVar,senhaVar);

    if (emailVar == "" || senhaVar == "") {
        alert('erro login senha');
        return false;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

   

    return false;
}