import { ComprasModel } from "../models/ComprasModel.js";

export function compras(app, bd){
    app.get("/compras", (req, res) => {
        res.send(bd.compras)
    })

    app.post("/compras", (req, res) => {
        const body = req.body;
        const newCompra = new ComprasModel(body.id, body.data_compra, body.id_estoque, body.id_cliente);
        bd.compras.push(newCompra);
        res.send(req.body);
    })

    app.get("/compras/:id", (req, res) => {
        const param = req.params.id
        const compraParam = bd.compras;
        res.send(compraParam.filter((element)=>element.id == param ))
    })

    app.delete("/compras/:id", (req, res) => {
        const param = req.params.id
        const compras = bd.compras;
        const compraParam = compras.filter((element)=>element.id == param );
        compras.splice(compras.indexOf(compraParam), 1)

        res.send(`{"mensagem" : "${param} deletado"}`)
    })

    app.put("/compras/:id", (req, res) => {
        const param = req.params.id;
        const body = req.body;
        for(let i = 0; i <= bd.compras.length; i++ ){
            if(bd.compras[i].id == param ){
                const DadoAntigo = bd.compras[i];
                const DadoNovo = new ComprasModel(
                body.id || DadoAntigo.id,
                body.data_compra|| DadoAntigo.data_compra,
                body.id_estoque|| DadoAntigo.id_estoque,
                body.id_cliente || DadoAntigo.id_cliente
                )
                bd.compras.splice(i,1,DadoNovo)
                res.json({"Dado Alterado": DadoNovo, "Dados Antigos:": DadoAntigo})    
            }
        }
    })
}