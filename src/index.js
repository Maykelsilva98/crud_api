import express from "express";
import {bd} from "./infra/bd.js";
import { pagamentosController } from "./controllers/PagamentosController.js";

const app = express();

app.use(express.json());

pagamentosController(app, bd)

app.listen(8080, ()=>{
    console.log("Servidor rodando")
})
