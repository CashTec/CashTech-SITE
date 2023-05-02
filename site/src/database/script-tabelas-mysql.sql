CREATE DATABASE cashtech;
USE cashtech;

-- -----------------------------------------------------
-- Table Endereco
-- -----------------------------------------------------
CREATE TABLE Endereco (
  id INT NOT NULL AUTO_INCREMENT,
  rua VARCHAR(45) NULL,
  bairro VARCHAR(45) NULL,
  numero VARCHAR(10) NULL,
  cep CHAR(8) NULL,
  cidade VARCHAR(45) NULL,
  latitude DOUBLE NULL,
  longitude DOUBLE NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Table Empresa
-- -----------------------------------------------------
CREATE TABLE Empresa (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  cnpj CHAR(14) NULL,
  email VARCHAR(45) NULL,
  telefone CHAR(11) NULL,
  endereco_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Empresa_Endereco_idx (endereco_id ASC) VISIBLE,
  CONSTRAINT fk_Empresa_Endereco FOREIGN KEY (endereco_id) REFERENCES Endereco (id)
);

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
  endereco_id INT NOT NULL,
  sistema_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_CaixaEletronico_Empresa1_idx (empresa_id ASC) VISIBLE,
  INDEX fk_CaixaEletronico_Sistema1_idx (sistema_id ASC) VISIBLE,
  INDEX fk_CaixaEletronico_Endereco1_idx (endereco_id ASC) VISIBLE,
  CONSTRAINT fk_CaixaEletronico_Empresa1 FOREIGN KEY (empresa_id) REFERENCES Empresa (id),
  CONSTRAINT fk_CaixaEletronico_Sistema1 FOREIGN KEY (sistema_id) REFERENCES Sistema (id),
  CONSTRAINT fk_CaixaEletronico_Endereco1 FOREIGN KEY (endereco_id) REFERENCES Endereco (id)
);
-- -----------------------------------------------------
-- Table Processo
-- -----------------------------------------------------
CREATE TABLE Processo (
  id INT NOT NULL AUTO_INCREMENT,
  caixa_eletronico_id INT NOT NULL,
  nome VARCHAR(45) NULL,
  pid CHAR(5) NULL,
  uso_cpu DOUBLE NULL,
  uso_memoria INT NULL,
  byte_utilizado INT NULL,
  memoria_virtual_ultilizada BIGINT NULL,
  id_dead TINYINT NULL DEFAULT 0,
  dt_processo DATETIME NULL,
  PRIMARY KEY (id),
  INDEX fk_Processo_CaixaEletronico1_idx (caixa_eletronico_id ASC) VISIBLE,
  CONSTRAINT fk_Processo_CaixaEletronico1 FOREIGN KEY (caixa_eletronico_id) REFERENCES CaixaEletronico (id)
);
-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
CREATE TABLE Usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  login VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  tipo_usuario VARCHAR(45) NULL,
  empresa_id INT NOT NULL,
  PRIMARY KEY (id, empresa_id),
  INDEX fk_Usuario_Empresa1_idx (empresa_id ASC) VISIBLE,
  CONSTRAINT fk_Usuario_Empresa1 FOREIGN KEY (empresa_id) REFERENCES Empresa (id)
);
-- -----------------------------------------------------
-- Table Parametrizacao
-- -----------------------------------------------------
CREATE TABLE Parametrizacao (
  id INT NOT NULL AUTO_INCREMENT,
  empresa_id INT NOT NULL,
  qtd_cpu_max INT NULL DEFAULT 0,
  qtd_bytes_enviado_max INT NULL DEFAULT 0,
  qtd_bytes_recebido_max INT NULL DEFAULT 0,
  qtd_memoria_max INT NULL DEFAULT 0,
  qtd_disco_max INT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX fk_Parametrizacao_Empresa1_idx (empresa_id ASC) VISIBLE,
  CONSTRAINT fk_Parametrizacao_Empresa1 FOREIGN KEY (empresa_id) REFERENCES Empresa (id)
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
  PRIMARY KEY (id),
  INDEX fk_Network_Interface_CaixaEletronico1_idx (caixa_eletronico_id ASC) VISIBLE,
  CONSTRAINT fk_Network_Interface_CaixaEletronico1 FOREIGN KEY (caixa_eletronico_id) REFERENCES CaixaEletronico (id)
);
-- -----------------------------------------------------
-- Table MetricaRedeInterface
-- -----------------------------------------------------
CREATE TABLE MetricaRedeInterface (
  id INT NOT NULL AUTO_INCREMENT,
  bytes_recebidos_segundo INT NULL,
  bytes_enviados_segundo INT NULL,
  dt_metrica DATETIME NULL,
  network_interface_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_MetricaRedeInterface_Network_Interface1_idx (network_interface_id ASC) VISIBLE,
  CONSTRAINT fk_MetricaRedeInterface_Network_Interface1 FOREIGN KEY (network_interface_id) REFERENCES NetworkInterface (id)
);
-- -----------------------------------------------------
-- Table MetricaSistema
-- -----------------------------------------------------
CREATE TABLE MetricaSistema (
  id INT NOT NULL AUTO_INCREMENT,
  iniciado DATETIME NULL,
  tempo_atividade DATETIME NULL,
  dt_metrica DATETIME NULL,
  sistema_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_MetricaSistema_Sistema1_idx (sistema_id ASC) VISIBLE,
  CONSTRAINT fk_MetricaSistema_Sistema1 FOREIGN KEY (sistema_id) REFERENCES Sistema (id)
);
-- -----------------------------------------------------
-- Table Notificacao
-- -----------------------------------------------------
CREATE TABLE Notificacao (
  id INT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(255) NULL,
  dt_notificacao DATETIME NULL,
  empresa_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_Notificacao_Empresa1_idx (empresa_id ASC) VISIBLE,
  CONSTRAINT fk_Notificacao_Empresa1 FOREIGN KEY (empresa_id) REFERENCES Empresa (id)
);
-- -----------------------------------------------------
-- Table Componente
-- -----------------------------------------------------
CREATE TABLE Componente (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(45) ,
  nome VARCHAR(45) ,
  modelo VARCHAR(80) ,
  serie VARCHAR(45),
  frequencia DOUBLE ,
  qtd_cpu_fisica INT,
  qtd_cpu_logica INT,
	qtd_maxima LONG ,
  qtd_disponivel LONG ,
  ponto_montagem VARCHAR(45) ,
  sistema_arquivos varchar(5) ,
	caixa_eletronico_id INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_Network_Interface_CaixaEletronico10
  FOREIGN KEY (caixa_eletronico_id)
  REFERENCES CaixaEletronico (id))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table MetricaComponente
-- -----------------------------------------------------
CREATE TABLE MetricaComponente (
  id INT NOT NULL AUTO_INCREMENT,
  qtd_consumido DOUBLE NULL,
  dt_metrica DATETIME NULL,
  componente_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_MetricaComponente_Componente1_idx (componente_id ASC) VISIBLE,
  CONSTRAINT fk_MetricaComponente_Componente1 FOREIGN KEY (componente_id) REFERENCES Componente (id)
);
-- -----------------------------------------------------
-- Table ProcessoPermitido
-- -----------------------------------------------------
CREATE TABLE ProcessoPermitido (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NULL,
  empresa_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_ProcessoPermitido_Empresa1_idx (empresa_id ASC) VISIBLE,
  CONSTRAINT fk_ProcessoPermitido_Empresa1 FOREIGN KEY (empresa_id) REFERENCES Empresa (id)
);

-- Conferir dados: 
select * from Sistema;
select * from Endereco;
select * from CaixaEletronico;
select * from Empresa;
select * from ProcessoPermitido;
select * from Processo;
select * from Usuario;