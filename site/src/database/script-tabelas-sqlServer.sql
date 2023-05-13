-- ====================================== Para reiniciar/criar o banco: ====================================== 
EXEC droparEcriarTabelas;
-- ===========================================================================================================
-- Script de criação -> configuração da procedure
-- ====================== Criação da Procedure ============================
CREATE PROCEDURE droparEcriarTabelas AS BEGIN
SET NOCOUNT ON;
DROP TABLE IF EXISTS dbo.Usuario;
DROP TABLE IF EXISTS dbo.Parametrizacao;
DROP TABLE IF EXISTS dbo.ProcessoPermitido;
DROP TABLE IF EXISTS dbo.Notificacao;
DROP TABLE IF EXISTS dbo.MetricaSistema;
DROP TABLE IF EXISTS dbo.MetricaComponente;
DROP TABLE IF EXISTS dbo.MetricaRedeInterface;
DROP TABLE IF EXISTS dbo.Componente;
DROP TABLE IF EXISTS dbo.Processo;
DROP TABLE IF EXISTS dbo.NetworkInterface;
DROP TABLE IF EXISTS dbo.CaixaEletronico;
DROP TABLE IF EXISTS dbo.Sistema;
DROP TABLE IF EXISTS dbo.Empresa;
DROP TABLE IF EXISTS dbo.Endereco;
-- -----------------------------------------------------
-- Table Endereco
-- -----------------------------------------------------
CREATE TABLE Endereco (
	id INT NOT NULL IDENTITY(1, 1),
	rua VARCHAR(45) NULL,
	bairro VARCHAR(45) NULL,
	numero VARCHAR(10) NULL,
	cep CHAR(8) NULL,
	cidade VARCHAR(45) NULL,
	latitude FLOAT NULL,
	longitude FLOAT NULL,
	PRIMARY KEY (id)
);
-- -----------------------------------------------------
-- Table Empresa
-- -----------------------------------------------------
CREATE TABLE Empresa (
	id INT NOT NULL IDENTITY(1, 1),
	nome VARCHAR(45) NULL,
	cnpj CHAR(14) NULL,
	email VARCHAR(45) NULL,
	telefone CHAR(11) NULL,
	endereco_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (endereco_id) REFERENCES Endereco (id) 
);
-- -----------------------------------------------------
-- Table Sistema
-- -----------------------------------------------------
CREATE TABLE Sistema (
	id INT NOT NULL IDENTITY(1, 1),
	nome VARCHAR(45) NULL,
	fabricante VARCHAR(45) NULL,
	arquitetura VARCHAR(45) NULL,
	PRIMARY KEY (id)
);
-- -----------------------------------------------------
-- Table CaixaEletronico
-- -----------------------------------------------------
CREATE TABLE CaixaEletronico (
	id INT NOT NULL IDENTITY(1, 1),
	identificador VARCHAR(45) NULL,
	situacao VARCHAR(15) NULL,
	empresa_id INT NOT NULL,
	endereco_id INT NOT NULL,
	sistema_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (empresa_id) REFERENCES Empresa (id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (sistema_id) REFERENCES Sistema (id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (endereco_id) REFERENCES Endereco (id)
);
-- -----------------------------------------------------
-- Table Processo
-- -----------------------------------------------------
CREATE TABLE Processo (
	id INT NOT NULL IDENTITY(1, 1),
	caixa_eletronico_id INT NOT NULL,
	nome VARCHAR(255) NULL,
	pid CHAR(5) NULL,
	uso_cpu FLOAT NULL,
	uso_memoria INT NULL,
	byte_utilizado INT NULL,
	memoria_virtual_ultilizada BIGINT NULL,
	id_dead BIT NULL DEFAULT 0,
	dt_processo DATETIME NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (caixa_eletronico_id) REFERENCES CaixaEletronico (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
CREATE TABLE Usuario (
	id INT NOT NULL IDENTITY(1, 1),
	nome VARCHAR(45) NULL,
	login VARCHAR(45) NULL,
	senha VARCHAR(45) NULL,
	tipo_usuario VARCHAR(45) NULL,
	empresa_id INT NOT NULL,
	PRIMARY KEY (id, empresa_id),
	FOREIGN KEY (empresa_id) REFERENCES Empresa (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table Parametrizacao
-- -----------------------------------------------------
CREATE TABLE Parametrizacao (
	id INT NOT NULL IDENTITY(1, 1),
	empresa_id INT NOT NULL,
	qtd_cpu_max INT NULL DEFAULT 90,
	qtd_bytes_enviado_max INT NULL DEFAULT 100000,
	qtd_bytes_recebido_max INT NULL DEFAULT 100000,
	qtd_memoria_max INT NULL DEFAULT 90,
	qtd_disco_max INT NULL DEFAULT 90,
	PRIMARY KEY (id),
	FOREIGN KEY (empresa_id) REFERENCES Empresa (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table NetworkInterface
-- -----------------------------------------------------
CREATE TABLE NetworkInterface (
	id INT NOT NULL IDENTITY(1, 1),
	nome VARCHAR(45) NULL,
	nome_exibicao VARCHAR(80) NULL,
	ipv4 VARCHAR(45) NULL,
	ipv6 VARCHAR(45) NULL,
	mac VARCHAR(45) NULL,
	caixa_eletronico_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (caixa_eletronico_id) REFERENCES CaixaEletronico (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table MetricaRedeInterface
-- -----------------------------------------------------
CREATE TABLE MetricaRedeInterface (
	id INT NOT NULL IDENTITY(1, 1),
	bytes_recebidos_segundo INT NULL,
	bytes_enviados_segundo INT NULL,
	dt_metrica DATETIME NULL,
	network_interface_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (network_interface_id) REFERENCES NetworkInterface (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table MetricaSistema
-- -----------------------------------------------------
CREATE TABLE MetricaSistema (
	id INT NOT NULL IDENTITY(1, 1),
	iniciado DATETIME NULL,
	tempo_atividade bigint NULL,
	dt_metrica DATETIME NULL,
	sistema_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (sistema_id) REFERENCES Sistema (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table Notificacao
-- -----------------------------------------------------
CREATE TABLE Notificacao (
	id INT NOT NULL IDENTITY(1, 1),
	descricao VARCHAR(255) NULL,
	dt_notificacao DATETIME NULL,
	empresa_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (empresa_id) REFERENCES Empresa (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table Componente
-- -----------------------------------------------------
CREATE TABLE Componente (
	id INT NOT NULL IDENTITY(1, 1),
	tipo VARCHAR(45) NULL,
	nome VARCHAR(100) NULL,
	modelo VARCHAR(80) NULL,
	serie VARCHAR(45) NULL,
	frequencia FLOAT NULL,
	qtd_cpu_fisica INT,
	qtd_cpu_logica INT,
	qtd_maxima BIGINT NULL,
	qtd_disponivel BIGINT NULL,
	ponto_montagem VARCHAR(255) NULL,
	sistema_arquivos VARCHAR(5) NULL,
	caixa_eletronico_id INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_Componente_CaixaEletronico FOREIGN KEY (caixa_eletronico_id) REFERENCES CaixaEletronico (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table MetricaComponente
-- -----------------------------------------------------
CREATE TABLE MetricaComponente (
	id INT NOT NULL IDENTITY(1, 1),
	qtd_consumido FLOAT NULL,
	dt_metrica DATETIME NULL,
	componente_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (componente_id) REFERENCES Componente (id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table ProcessoPermitido
-- -----------------------------------------------------
CREATE TABLE ProcessoPermitido (
	id INT NOT NULL IDENTITY(1, 1),
	nome VARCHAR(255) NULL,
	empresa_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (empresa_id) REFERENCES Empresa (id) ON UPDATE CASCADE ON DELETE CASCADE
);
END;