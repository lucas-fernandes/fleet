CREATE DATABASE bdlogin;

use bdlogin;

CREATE TABLE users(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    sobrenome VARCHAR (100) NOT NULL,
    nascimento INTEGER NOT NULL,
    email VARCHAR (100) NOT NULL,
    telefone INTEGER NOT NULL,
    cars_id VARCHAR(100) NOT NULL,
    user VARCHAR (100) NOT NULL,
    pass INTEGER NOT NULL

);

CREATE TABLE cars(
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR (100) NOT NULL,
    placa VARCHAR (100) NOT NULL,
    cor VARCHAR (100) NOT NULL,
    fabricacao INTEGER NOT NULL

);