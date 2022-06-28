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
}