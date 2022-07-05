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



