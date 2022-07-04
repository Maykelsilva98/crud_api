import express from "express";
import { bd } from "./infra/sqlite-bd.js";
import { produtos } from "./controllers/produtos_controller.js";
import { ProdutosDao } from "./DAO/produtos_dao.js"

const app = express();
app.use(express.json());

produtos(app, bd);

app.listen(3003, () => {
    console.log("Funcionando!");
  });