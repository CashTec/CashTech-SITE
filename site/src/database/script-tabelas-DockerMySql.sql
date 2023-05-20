CREATE DATABASE cashtech;
USE cashtech;

-- ===========================================================================================================
-- Script de criação -> configuração da procedure
-- ====================== Criação da Procedure ============================
DELIMITER //
CREATE PROCEDURE droparEcriarTabelas()
BEGIN

DROP TABLE IF EXISTS Notificacao;
DROP TABLE IF EXISTS MetricaSistema;
DROP TABLE IF EXISTS MetricaComponente;
DROP TABLE IF EXISTS MetricaRedeInterface;
DROP TABLE IF EXISTS Componente;
DROP TABLE IF EXISTS Processo;
DROP TABLE IF EXISTS NetworkInterface;
DROP TABLE IF EXISTS CaixaEletronico;
DROP TABLE IF EXISTS Sistema;


-- -----------------------------------------------------
-- Table Sistema
-- -----------------------------------------------------
CREATE TABLE Sistema (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NULL,
	fabricante VARCHAR(45) NULL,
	arquitetura VARCHAR(45) NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table CaixaEletronico
-- -----------------------------------------------------
CREATE TABLE CaixaEletronico (
	id INT NOT NULL AUTO_INCREMENT,
	identificador VARCHAR(45) NULL,
	situacao VARCHAR(15) NULL,
	empresa_id INT NOT NULL,
	endereco_id INT NULL,
	sistema_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table Processo
-- -----------------------------------------------------
CREATE TABLE Processo (
	id INT NOT NULL AUTO_INCREMENT,
	caixa_eletronico_id INT NOT NULL,
	nome VARCHAR(255) NULL,
	pid CHAR(5) NULL,
	uso_cpu FLOAT NULL,
	uso_memoria INT NULL,
	byte_utilizado INT NULL,
	memoria_virtual_ultilizada BIGINT NULL,
	id_dead TINYINT NULL DEFAULT 0,
	dt_processo DATETIME NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table NetworkInterface
-- -----------------------------------------------------
CREATE TABLE NetworkInterface (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(45) NULL,
	nome_exibicao VARCHAR(80) NULL,
	ipv4 VARCHAR(45) NULL,
	ipv6 VARCHAR(45) NULL,
	mac VARCHAR(45) NULL,
	caixa_eletronico_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table MetricaRedeInterface
-- -----------------------------------------------------
CREATE TABLE MetricaRedeInterface (
	id INT NOT NULL AUTO_INCREMENT,
	bytes_recebidos_segundo BIGINT NULL,
	bytes_enviados_segundo BIGINT NULL,
	dt_metrica DATETIME NULL,
	network_interface_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table MetricaSistema
-- -----------------------------------------------------
CREATE TABLE MetricaSistema (
	id INT NOT NULL AUTO_INCREMENT,
	iniciado DATETIME NULL,
	tempo_atividade BIGINT NULL,
	dt_metrica DATETIME NULL,
	sistema_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table Notificacao
-- -----------------------------------------------------
CREATE TABLE Notificacao (
	id INT NOT NULL AUTO_INCREMENT,
	descricao VARCHAR(500) NULL,
	dt_notificacao DATETIME NULL,
	empresa_id INT NOT NULL,
	PRIMARY KEY (id)
);
-- -----------------------------------------------------
-- Table Componente
-- -----------------------------------------------------
CREATE TABLE Componente (
	id INT NOT NULL AUTO_INCREMENT,
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
	sistema_arquivos VARCHAR(255) NULL,
	caixa_eletronico_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table MetricaComponente
-- -----------------------------------------------------
CREATE TABLE MetricaComponente (
	id INT NOT NULL AUTO_INCREMENT,
	qtd_consumido FLOAT NULL,
	dt_metrica DATETIME NULL,
	componente_id INT NOT NULL,
	PRIMARY KEY (id)
);

END //
DELIMITER ;

-- ====================================================================================


-- ====================================== Para reiniciar/criar o banco com a procedure: ====================================== 
CALL droparEcriarTabelas();

