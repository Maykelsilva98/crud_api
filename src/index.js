import express from "express";
import { bd } from "./infra/sqlite-db.js";
import { pagamentosController } from "./controllers/PagamentosController.js";

const app = express();

app.use(express.json());

pagamentosController(app, bd)

app.listen(3333, ()=>{
    console.log("Servidor rodando")
})
