/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.db');

//==== Compras
const COMPRAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "COMPRAS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "DATA_COMPRA" varchar(64),
    "ID_ESTOQUE" varchar(64),
    "ID_CLIENTE" varchar(64)
  );`

const ADD_COMPRAS_DATA = `
INSERT INTO COMPRAS (ID, DATA_COMPRA, ID_ESTOQUE, ID_CLIENTE)
VALUES 
    (1, '22/06/2022', '2244', '19'),
    (2, '15/06/2022', '2356', '54'),
    (3, '24/06/2022', '2109', '43');`

function criaTabelaCompra() {
    db.run(COMPRAS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de usuários");
    });
}


function populaTabelaCompra() {
    db.run(ADD_COMPRAS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de usuários");
    });
}

db.serialize( ()=> {
    criaTabelaCompra();
    populaTabelaCompra();
});