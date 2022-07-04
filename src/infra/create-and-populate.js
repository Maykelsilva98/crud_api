import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.db');

const PRODUTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PRODUTOS" (
    "ID" VARCHAR(50) PRIMARY KEY,
    "NOME" varchar(64),
    "COR" varchar(64),
    "MARCA" varchar(64),
    "PESO" varchar(64),
    "TAMANHO" varchar(64),
    "VALOR" varchar(64),
    "DESCRICAO" varchar(64)
  );`;

db.serialize( ()=> {
    criaTabelaUsr();
});