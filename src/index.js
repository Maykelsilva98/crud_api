import express from 'express';
import { compras } from './controllers/compras-controller.js';
import { bd } from './infra/bd.js';
const app = express();

app.use(express.json()); // middleware, manipula a requisição antes de chegar na rota

compras(app, bd);

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})