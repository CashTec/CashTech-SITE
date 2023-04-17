function editarUsoMax(campo) {
    var in_campo;
    var img_campo;
    var isPorcentagem = false;

    switch (campo) {
        case 'Processador':
            in_campo = edtProcessador;
            img_campo = imgProcessador;
            isPorcentagem = true;
            break;
        case 'Memoria':
            in_campo = edtMemoria;
            img_campo = imgMemoria;
            isPorcentagem = true;
            break;
        case 'Disco':
            in_campo = edtDisco;
            img_campo = imgDisco;
            isPorcentagem = true;
            break;
        case 'BytesRecebidos':
            in_campo = edtBytesRecebidos;
            img_campo = imgBytesRecebidos;
            break;
        case 'BytesEnviados':
            in_campo = edtBytesEnviados;
            img_campo = imgBytesEnviados;
            break;
        default:
            break;
    }

    if (img_campo.src.match("lapis-parametro.svg")) {
        img_campo.src = "img/cashTechSystem/confirm.svg";
        in_campo.disabled = false;
        if (isPorcentagem) {
            in_campo.parentElement.children[1].style.color = "#000";
        }
    } else {
        img_campo.src = "img/cashTechSystem/lapis-parametro.svg"
        in_campo.disabled = true;
        if (isPorcentagem) {
            in_campo.parentElement.children[1].style.color = "#848484";
        }
    }

}