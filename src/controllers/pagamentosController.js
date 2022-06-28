import { Pagamentos } from "../models/pagamentosModel.js";

export const pagamentosController = (app, bd) =>{
    app.get("/pagementos", (req, res) =>{
        res.send(bd.pagamentos)
    })

    app.post("/pagamentos", (req, res) =>{
        const body = req.body
        const novoPagamento = new Pagamentos(body.id,body.cliente_id, body.valor, body.data, 
            body.forma_pagamento, body.id_compras )
        bd.pagamentos.push(novoPagamento)
    })

    app.delete("/pagamentos/:id", (req, res)=>{
        const par = req.params.id
        bd.pagamentos.forEach((x, i) =>{
            if (x.id = par){
                bd.pagamentos.splice(i, 1)
                res.send("Objeto removido")
            }
        })
        res.send("Objeto não encontrado")
    })

    app.put("/pagamentos/:id", (req, res) => {
        const par = req.params.id
        const indice = bd.pagamentos.findIndex(x => x.id == par)
        const dadoAntigo = bd.pagamentos[indice]
        const dadoNovo = req.body

        const pagamentoNovo = new Pagamentos(
            dadoNovo.id || dadoAntigo.id,
            dadoNovo.cliente_id || dadoAntigo.cliente_id,
            dadoNovo.valor || dadoAntigo.valor,
            dadoNovo.data || dadoAntigo.data,
            dadoNovo.forma_pagamento || dadoAntigo.forma_pagamento,
            dadoNovo.id_compras || dadoAntigo.id_compras
        )

        bd.pagamento.splice(indice, 1, pagamentoNovo)
        res.json({"Pagamento antigo": dadoAntigo, "Pagamento novo": dadoNovo})
    })
}