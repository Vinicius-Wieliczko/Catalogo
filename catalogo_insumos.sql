CREATE DATABASE IF NOT EXISTS catalogo_insumos;
USE catalogo_insumos;

CREATE TABLE insumos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria ENUM('Químicos e Minerais', 'Biológicos') NOT NULL,
    descricao TEXT,
    quantidade INT NOT NULL
);