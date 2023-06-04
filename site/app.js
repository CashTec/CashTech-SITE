// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";


var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

// Isso é uma base de outro projeto, Mudar de acordo com o grupo
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var compontentesRouter = require("./src/routes/componentes")
var metricasRouter = require("./src/routes/metricas")
var compontentesRouter = require("./src/routes/componentes");
var enderecoRouter = require("./src/routes/endereco");
var parametrizacaoRouter = require("./src/routes/parametrizacao");
var processosRouter = require("./src/routes/processos")
var listaAtmRouter = require("./src/routes/listaAtm")
var geralRouter = require("./src/routes/geral");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));//*
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/componentes", compontentesRouter);
app.use("/metricas", metricasRouter);
app.use("/endereco", enderecoRouter);
app.use("/parametrizacao", parametrizacaoRouter)
app.use("/processos", processosRouter);
app.use("/listaAtm", listaAtmRouter);
app.use("/geral", geralRouter);


app.listen(PORTA, function () {
    console.log(`
    CashTech application\n
    \t\tAcesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    \t\tAplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n`);
});
                