import express from 'express';
import cors from 'cors';
import {bd_mysql as bd} from './infra/bd_mysql.js'
// import { ClientesController } from './controllers/ClientesController.js';
// import { pagamentosController } from './controllers/PagamentosController.js';
// import { compras } from './controllers/compras-controller.js';
import { produtos } from './controllers/produtos_controller.js';





const app = express()

app.use(cors())
app.use(express.json())

// pagamentosController(app, bd)
// ClientesController(app, bd)
// compras(app, bd);
produtos(app, bd);

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})


