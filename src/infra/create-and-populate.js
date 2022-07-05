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

db.serialize( ()=> {
    criaTabelaUsr();
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
