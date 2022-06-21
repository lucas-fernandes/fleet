/*  -- Script BD --  */
CREATE DATABASE dblogin;

USE dblogin;

CREATE TABLE users(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    sobrenome VARCHAR (100) NOT NULL,
    nascimento DATE NOT NULL,
    email VARCHAR (100) NOT NULL,
    telefone BIGINT(14) NOT NULL,
    nome_car VARCHAR(50) NOT NULL,
    user VARCHAR (50) NOT NULL,
    pass INTEGER NOT NULL

);

CREATE TABLE cars(
	nome VARCHAR(50) NOT NULL PRIMARY KEY,
    modelo VARCHAR (100) NOT NULL,
    placa VARCHAR (10) NOT NULL,
    cor VARCHAR (10) NOT NULL,
    fabricacao DATE NOT NULL

);

ALTER TABLE `users` ADD CONSTRAINT `fk_car` FOREIGN KEY ( `cars_id` ) REFERENCES `cidade` ( `codcidade` ) ;

/* 
    ALTER TABLE users ADD FOREIGN KEY(cars_id) REFERENCES cars(id); 
*/