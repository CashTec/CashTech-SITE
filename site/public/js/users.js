// ****************************************************
// REVER COMO ESTA SALVO NA SESSION STOREGE
// Troquei orquestra por empresa e musico por usuario
// ****************************************************

spn_userNome.innerHTML = sessionStorage.NOME_USUARIO;
const idEmpresa = sessionStorage.ID_EMPRESA;

// ------------------ Funções de modal ------------------------//
function abrir_modalAdicionar() {
  div_backgroundModal.style.display = "flex";
  div_adicionarModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function fechar_modalAdicionar() {
  div_adicionarModal.classList.add("sumirModal");

  setTimeout(() => {
    div_backgroundModal.style.display = "none";
    div_adicionarModal.classList.remove("sumirModal");
    div_adicionarModal.style.display = "none";
    document.body.style.overflow = "";
  }, 500);
}

function abrir_modalEditar(idUsuario) {
  listarUm(idUsuario);
  div_backgroundModal.style.display = "flex";
  div_editarModal.style.display = "block";
  document.body.style.overflow = "hidden";
  btn_editar.addEventListener("click", function () {
    editar(idUsuario);
  });
}
function fechar_modalEditar() {
  div_editarModal.classList.add("sumirModal");
  setTimeout(() => {
    div_backgroundModal.style.display = "none";
    div_editarModal.classList.remove("sumirModal");
    div_editarModal.style.display = "none";
    document.body.style.overflow = "";
  }, 500);
}

function abrir_modalPesquisar() {
  div_backgroundModal.style.display = "flex";
  div_pesquisarModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function fechar_modalAdicionar() {
  div_adicionarModal.classList.add("sumirModal");

  in_adcNome.value = "";

  setTimeout(() => {
    div_backgroundModal.style.display = "none";
    div_adicionarModal.classList.remove("sumirModal");
    div_adicionarModal.style.display = "none";
    document.body.style.overflow = "";
  }, 500);
}

function abrir_modalDeletar(idUsuario) {
  div_backgroundModal.style.display = 'flex';
  div_deletarModal.style.display = 'block'
  document.body.style.overflow = 'hidden';

  btn_deletar.addEventListener("click", ()=> {deletar_usuario(idUsuario)});
}

function fechar_modalDeletar() {
  div_deletarModal.classList.add('sumirModal');
  setTimeout(() => {
      div_backgroundModal.style.display = 'none';
      div_deletarModal.classList.remove('sumirModal');
      div_deletarModal.style.display = 'none'
      document.body.style.overflow = '';
  }, 500);
}
// ------------------ FIM Funções de modal ------------------------//

// ------------------ Função de Adicionar funcionario ------------------------//

function adicionarUsuario() {
  fetch(`/usuarios/addUser/${idEmpresa}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: in_adcNome.value,
      funcao: in_adcFuncao.value,
      email: in_adcEmail.value,
      senha: in_adcSenha.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        fechar_modalAdicionar();
        atualizarFeed();
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}
// ------------------ Fim Função de Adicionar Funcionario ------------------------//

// Aparentemente ta ok
// ------------------ Função de Atualizar Feed ------------------------//

function atualizarFeed(tipo, campo) {
  let filtroComponente = "";
  loadingGif();
  if (tipo != undefined && campo != undefined) {
    filtroComponente = `/${tipo}/${campo}`;
  }

  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/usuarios/listar/${idEmpresa}${filtroComponente}`)
    .then((resposta) => {
      if (resposta.ok) {
        in_pesquisa.value = "";
        resposta.json().then((json) => {
          console.log("Dados recebidos: ", JSON.stringify(json));
          plotarTabela(json);
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}
// ------------------ Fionkeydownm Função de Atualizar Feed ------------------------//

function pesquisar(event) {
  if (event.keyCode === 13 || event.type === "click") {
    let tipo = sel_tipoPesquisa.value;
    let campo = in_pesquisa.value;
    atualizarFeed(tipo, campo);
  }
}
// ------------------ Função de Deletar funcionario ------------------------//
function deletar_usuario(idUsuario) {
  
  fetch(`/usuarios/deletar_usuario/${idUsuario}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        atualizarFeed();
        fechar_modalDeletar();
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
// ------------------ Fim Função de Deletar funcionario ------------------------//

// ------------------ Função de Editar funcionario ------------------------//
function listarUm(idUsuario) {
  fetch(`/usuarios/listarUm/${idUsuario}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (json) {
          let usuario = json[0];
          in_edtNome.value = usuario.nome;
          in_edtEmail.value = usuario.login;
          in_edtFuncao.value = usuario.tipo_usuario;
          in_edtSenha.value = usuario.senha;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function editar(idUsuario) {
  fetch(`/usuarios/editar/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: in_edtNome.value,
      emailServer: in_edtEmail.value,
      funcaoServer: in_edtFuncao.value,
      senhaServer: in_edtSenha.value,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        atualizarFeed();
        fechar_modalEditar();
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

// ------------------ Fim Função de Editar funcionario ------------------------//

function plotarTabela(json) {
  div_planilhaUsers.innerHTML = `
        <table class="tabela-users">
                        <thead>
                            <tr>
                                <th>
                                    <button onclick="ordenar('nome')">Usuário</button>
                                </th>
                                <th>
                                  <button onclick="ordenar('login')">Login</button></th>
                                <th class="tdInicio">
                                  <button onclick="ordenar('senha')">Senha</button>
                                <th>
                                  <button onclick="ordenar('permissao')">Permissão</button>
                                </th>
                                <th>
                                  <button>Editar</button></th>
                                <th>
                                  <button>Excluir</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="table_users">
                        </tbody>
                    </table>
        `;

  for (const usuario of json) {
    table_users.innerHTML += `
      <tr>
         <td>${usuario.nome}</td>
         <td>${usuario.login}</td>
         <td>${usuario.senha}</td>
         <td>${usuario.tipo_usuario}</td>
      <td class="tdImg">
        <button onclick="abrir_modalEditar(${usuario.id})">
          <img src="./img/cashTechSystem/lapis.svg">
        </button>
      </td>
      <td class="tdImg">
        <button onclick="abrir_modalDeletar(${usuario.id})">
          <img src="./img/cashTechSystem/lixo.svg">
        </button>
      </td>
    </tr>
        `;
  }
}

function loadingGif() {
  div_planilhaUsers.innerHTML = `
  <div class="loading" id="loadingGif">
      <img src="img/cashTechSystem/loadingGif.svg" alt="">
  </div>
  `
}

