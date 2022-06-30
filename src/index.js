import express from "express";
import chalk from 'chalk';
import {bd} from "./infra/bd.js";
import { ClientesController } from './controllers/ClientesController.js';
import { pagamentosController } from "./controllers/PagamentosController.js";


const app = express()
const port = 3000
const address = `http://localhost:${port}`

app.use(express.json())

pagamentosController(app, bd)
ClientesController(app, bd)

app.listen(port, () => {
    console.log(chalk.cyan(`Listening to ${address}`))
})
