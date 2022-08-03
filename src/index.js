import express from 'express';
import cors from 'cors';
import {bd_mysql as bd} from './infra/bd_mysql.js'
import { ClientesController } from './controllers/ClientesController.js';
import { pagamentosController } from './controllers/PagamentosController.js';
import { compras } from './controllers/compras-controller.js';
import { produtos } from './controllers/produtos_controller.js';
import { ProdutosDao } from './DAO/produtos_dao.js'




const app = express()

app.use(express.json())
app.use(cors())

pagamentosController(app, bd)
ClientesController(app, bd)
compras(app, bd);
produtos(app, bd);


app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})


