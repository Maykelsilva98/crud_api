import express from 'express';
import { compras } from './controllers/compras-controller.js';
import { bd } from './infra/bd.js';
import sqlite3 from 'sqlite3';
import {bdSqlite} from './infra/sqlite-db.js'

const app = express();

app.use(express.json()); // middleware, manipula a requisição antes de chegar na rota

compras(app, bdSqlite);

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})