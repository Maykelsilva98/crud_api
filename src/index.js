import express from 'express';
import { compras } from './controllers/compras.js';
const app = express();

app.use(express.json());

compras(app);

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})