import sqlite3 from 'sqlite3';
const db = new sqlite3.Database("./database.db");

const PAGAMENTOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "PAGAMENTOS"(
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    CLIENTE_ID INTEGER,
    VALOR DECIMAL(5,2),
    DATA DATE,
    FORMA_PAGAMENTO VARCHAR(45),
    ID_COMPRAS INTEGER
);`;


function criaTabelaPagamentos(){
    db.run(PAGAMENTOS_SCHEMA, (error) =>{
        if(error) console.log("Erro ao criar tabela de pagamentos.")
    })
}


db.serialize(()=>{
    criaTabelaPagamentos(); 
})



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


function criaTabelaProdutos(){
    db.run(PRODUTOS_SCHEMA, (error) =>{
        if (error) console.log("Erro ao cria a tabela produtos.")
    })
}
db.serialize( ()=> {
    criaTabelaProdutos();
});


/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/


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
