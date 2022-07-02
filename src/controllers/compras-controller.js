import { ComprasModel } from "../models/ComprasModel.js";
import sqlite3 from 'sqlite3';
import {bdSqlite} from '../infra/sqlite-db.js'
import { ComprasDAO } from "../DAO/compras-dao.js";

export function compras(app,bdSqLite){
    const DadosDAO = new ComprasDAO(bdSqLite);

    app.get("/compras", (req, res) => {
        DadosDAO.listarCompras()
        .then((result) => {
          res.json(result)})
        .catch((err) => {res.send(err)}) 
    })

    app.post("/compras", (req, res) => {
        const body = req.body;
        const NovaCompra = new ComprasModel(body.id, body.data_compra, body.id_estoque, body.id_cliente)
        DadosDAO.inserirCompras(NovaCompra)
        .then((result) => {
        res.send("inserido com sucesso");
        }).catch((err) => {
          res.send(err);
        }) 

    })

    app.get("/compras/:id", (req, res) => {
        const id = req.params.id;
        DadosDAO.listarComprasID(id)
        .then((result) => {
          res.send(result);
        }).catch((err) => {
          res.send(err);
        })
    })

    app.delete("/compras/:id", (req, res) => {
        const param = req.params.id;
        DadosDAO.deletarCompra(param)
            .then((result)=>{
              res.send(`Usuário deletado com sucesso`);
            }).catch((err)=>{
              res.send(err);
            })
    })

    app.put("/compras/:id", (req, res) => {
        const param = req.params.id;
        const body = req.body;
        const compras = DadosDAO.listarComprasID(id);
        const DadoNovo = new ComprasModel(
                body.id || DadoAntigo.id,
                body.data_compra|| compras.data_compra,
                body.id_estoque|| compras.id_estoque,
                body.id_cliente || compras.id_cliente)
        const parametro = [DadoNovo.data_compra, DadoNovo.id_estoque, DadoNovo.id_cliente, param];
        const compraAtual = DadosDAO.alterarUsuario(parametro)
            .then((result) => {
                res.send(compraAtual)
            })
            .catch((error) => {
                res.send(err);
            })    
    })
}