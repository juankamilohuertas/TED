-- to create a new database
CREATE DATABASE customersdb;

-- to use database
use customersdb;

-- creating a new table
CREATE TABLE
  customer (
    id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    img VARCHAR(255)
  );

-- to show all tables
show tables;

-- to describe table
describe customer;

CREATE TABLE
  users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    password2 VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    terminos BOOLEAN NOT NULL
  );