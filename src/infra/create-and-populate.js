import * as sqlite3 from 'sqlite3'
export const db = new sqlite3.default.Database('./src/database/database.db');

const CRIAR_SCHEMA_CLIENTES = `
CREATE TABLE IF NOT EXISTS "CLIENTES" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "CPF" varchar(11),
    "EMAIL" varchar(50),
    "ENDERECO" varchar(255),
    "SEXO" varchar(20),
    "DATA_NASCIMENTO" date,
    "CELULAR" INTEGER,
    "ID_COMPRAS" INTEGER,
    "ID_PAGAMENTOS" INTEGER,
    "DATA_INSERCAO" DATE
        )`

const POPULAR_SCHEMA_CLIENTES = `
INSERT INTO CLIENTES (cpf, email, endereco, sexo, data_nascimento, celular, id_compras, id_pagamentos, data_insercao)
    VALUES
    ("12345678900", "sample@mail.com", "Wall Street, 234 Ave", "Male", "13-12-2002", "41936180243", "2", "2", "07-04-2022"),
    ("12345678900", "sample1@mail.com", "Wall Street, 235 Ave", "Female", "14-12-2002", "41936180244", "3", "3", "08-04-2022"),
    ("12345678900", "sample2@mail.com", "Wall Street, 236 Ave", "Female", "15-12-2002", "41936180245", "4", "4", "09-04-2022")
`

db.serialize(() => {
    db.run(CRIAR_SCHEMA_CLIENTES, (error) => {
        if (error) console.log(error)
    })

    db.run(POPULAR_SCHEMA_CLIENTES, (error) => {
        if (error) console.log(error)
    })
})