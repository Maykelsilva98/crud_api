import { Pagamentos } from "../models/pagamentosModel.js";
import { PagamentosDao } from "../DAO/pagamentosDao.js"

export const pagamentosController = (app, bd) =>{

    const pagamentosDao = new PagamentosDao(bd)

    app.get("/pagamentos", async (req, res) =>{
        try {
            const pagamento = await pagamentosDao.getPagamentos()
            res.status(200).send(pagamento)
        } catch(erro){
            res.status(400).send(erro)
        }
    })

    app.get("/pagamentos/:id", async (req, res) =>{
        const id = req.params.id
        try {
            const pagamentoID = await pagamentosDao.getPagamentosId(id)
            res.status(200).send(pagamentoID)
        } catch(erro){
            res.status(400).send(erro)
        }
    })

    app.post("/pagamentos",  async (req, res) =>{
        const body = req.body
        const novoPagamento = new Pagamentos(body.id, body.cliente_id, body.valor, body.data, 
            body.forma_pagamento, body.id_compras)
        try{
            const pagamento_add = await pagamentosDao.postPagamentos(novoPagamento)
            console.log(pagamento_add)
            res.status(200).send(pagamento_add)
        }catch(erro){
            res.status(400).send("erro")
        }
    })

    app.delete("/pagamentos/:id", async (req, res)=>{
        const id = req.params.id
        try{
            const pagamento_del = await pagamentosDao.deletePagamentos(id)
            res.status(200).send(pagamento_del)    
        }catch(erro){
            res.status(400).send(erro)
        }
    })

    app.put("/pagamentos/:id", async (req, res) => {
        const id = req.params.id
        const dadoAntigo = await pagamentosDao.getPagamentosId(id)
        const dadoNovo = req.body
        
        const pagamentoNovo = new Pagamentos(
            dadoNovo.id || dadoAntigo.id,
            dadoNovo.cliente_id || dadoAntigo.cliente_id,
            dadoNovo.valor || dadoAntigo.valor,
            dadoNovo.data || dadoAntigo.data,
            dadoNovo.forma_pagamento || dadoAntigo.forma_pagamento,
            dadoNovo.id_compras || dadoAntigo.id_compras
            )
            
        try{
            const pagamento_autal = await pagamentosDao.putPagamentos(id, pagamentoNovo)
            res.status(200).json({"Dado antigo" : dadoAntigo, "Dado novo": await pagamentosDao.getPagamentosId(id)})
        } catch(erro){
            res.status(400).send(erro)
        }
    })
}