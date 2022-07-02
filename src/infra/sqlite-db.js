import sqlite3 from 'sqlite3';
export const bdSqlite = new sqlite3.Database('./infra/database.db');

//Processamento de sinal
process.on('SIGINT', () =>
    bdSqlite.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);
