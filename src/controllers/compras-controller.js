import { ComprasModel } from "../models/ComprasModel.js";
// import sqlite3 from 'sqlite3';
// import {bdSqlite} from '../infra/sqlite-db.js'
import { ComprasDAO } from "../DAO/compras-dao.js";

export const compras = (app,bdSqLite)=>{
    const DadosDAO = new ComprasDAO(bdSqLite);

    app.get("/compras", (req, res) => {
        const data = async()=>{
          try{
            const compra = await DadosDAO.listarCompras()
            res.status(200).json(compra)
          }catch(error){
            res.status(404).json(error)
          }
        }
        data();
        
    })

    app.get("/compras/:id", (req, res) => {
      const data = async()=>{
        try{
            const compra = await DadosDAO.listarComprasID(req.params.id);
            res.status(200).json(compra)
        }catch(error){
            res.status(404).json(error)
        }
      }
      data();
    })
    app.post("/compras", (req, res) => {
      const body = req.body;
        const novaCompra = new ComprasModel(body.data_compra, body.id_estoque, body.id_cliente);
        const data = async()=>{
            try{
                const compra = await DadosDAO.inserirCompras(novaCompra);
                res.status(201).json(compra)
            }catch(error){
                res.status(404).json(error)
            }
        }
        data();
    })

    app.delete("/compras/:id", (req, res) => {
      const data = async()=>{
        try{
            const compra = await DadosDAO.deletarCompra(req.params.id);
            res.status(201).json(compra)
        }catch(error){
            res.status(404).json(error)
        }
    }
    data();
    })

    app.put("/compras/:id", (req, res) => {
      const body = req.body;
      const id = req.params.id;
          const data = async()=>{
              try{
                  const compraDadosAntigos = await DadosDAO.listarComprasID(id);
                  const compraAtualizada = new 
                      ComprasModel(body.data_compra || compraDadosAntigos[0].data_compra, 
                              body.id_estoque ||compraDadosAntigos[0].id_estoque, 
                              body.id_cliente || compraDadosAntigos[0].id_cliente)

                  const parametro = 
                  [compraAtualizada.data_compra, 
                      compraAtualizada.id_estoque, 
                      compraAtualizada.id_cliente, id]
                      console.log(parametro)
                  const compra = await DadosDAO.alterarCompra(parametro);
                  res.status(201).json(compra)
              }catch(error){
                  res.status(404).json(error)
              }
          }
          data();
        // const param = req.params.id;
        // const body = req.body;
        // const compras = DadosDAO.listarComprasID(id);
        // const DadoNovo = new ComprasModel(
        //         body.id || DadoAntigo.id,
        //         body.data_compra|| compras.data_compra,
        //         body.id_estoque|| compras.id_estoque,
        //         body.id_cliente || compras.id_cliente)
        // const parametro = [DadoNovo.data_compra, DadoNovo.id_estoque, DadoNovo.id_cliente, param];
        // const compraAtual = DadosDAO.alterarUsuario(parametro)
        //     .then((result) => {
        //         res.send(compraAtual)
        //     })
        //     .catch((error) => {
        //         res.send(error);
        //     })    
    })
}