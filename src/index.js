import chalk from 'chalk';
import express from 'express';
import { db } from './infra/create-and-populate.js';
import { ClientesController } from './controllers/ClientesController.js';

const app = express()
const port = 3000
const address = `http://localhost:${port}`

app.use(express.json())

ClientesController(app, db)

app.listen(port, () => {
    console.log(chalk.cyan(`Listening to ${address}`))
})