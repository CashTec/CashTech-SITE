create database cashtech;
use cashtech;
CREATE TABLE IF NOT EXISTS Endereco (
  `idEndereco` INT NOT NULL auto_increment,
  `rua` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  cidade varchar(45) null,
  `numero` VARCHAR(10) NULL,
  `cep` CHAR(8) NULL,
  PRIMARY KEY (`idEndereco`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Empresa (
  `idEmpresa` INT NOT NULL auto_increment,
  `nome` VARCHAR(45) NOT NULL,
  cnpj CHAR(14) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` CHAR(11) NOT NULL,
  `fkEndereco` INT NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  INDEX `fk_Empresa_Endereco_idx` (`fkEndereco` ASC) VISIBLE,
  CONSTRAINT `fk_Empresa_Endereco`
    FOREIGN KEY (`fkEndereco`)
    REFERENCES `Endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS Usuario (
  `idUsuario` INT NOT NULL auto_increment,
  `nome` VARCHAR(45) NULL,
  `login` VARCHAR(45) NULL unique,
  `senha` VARCHAR(45) NULL,
  `tipoUsuario` VARCHAR(45) NULL DEFAULT 'admin',
  `fkEmpresa` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `fkEmpresa`),
  INDEX `fk_Usuario_Empresa1_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
select * from usuario;
