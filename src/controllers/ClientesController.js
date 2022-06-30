import { ClientesModel } from "../models/ClientesModel.js"

export const ClientesController = (app, bd) => {
    app.get("/clientes", (req, res) => {
        res.send(bd.clientes)
    })

    app.post("/clientes", (req, res) => {
        const body = req.body
        const newUser = new ClientesModel(
            body.id, 
            body.cliente_id, 
            body.valor, 
            body.data, 
            body.forma_pagamento, 
            body.id_compras
        )

        bd.clientes.push(newUser)
        
        res.send(req.body) 
    })

    app.get("/clientes/:id", (req, res) => {
        const param = req.params.id
        const users = bd.clientes

        res.send(users.filter(el => el.id == param))
    })

    app.put("/clientes/:id", (req, res) => {
        const param = req.params.id
        const body = req.body
        const clientes = bd.clientes
        const clienteAntigoIndex = clientes.findIndex(el => el.id == param)
        const clienteAntigo = clientes[clienteAntigoIndex]

        const clienteAtualizado = new ClientesModel(
            body.id || clienteAntigo.id, 
            body.cliente_id || clienteAntigo.cliente_id, 
            body.valor || clienteAntigo.valor, 
            body.data || clienteAntigo.data, 
            body.forma_pagamento || clienteAntigo.forma_pagamento, 
            body.id_compras || clienteAntigo.id_compras
        )

        clientes.splice(clienteAntigoIndex, 1, clienteAtualizado)

        res.json({
            "Atualizado corretamente": clienteAntigo,
            "Novos dados": clienteAtualizado
        })
    })

    app.delete("/clientes/:id", (req, res) => {
        const param = req.params.id
        const clientes = bd.clientes
        const cliente = clientes.findIndex(el => el.id == param)
        
        res.json({
            "Cliente removido com sucesso": clientes[cliente]
        })

        clientes.splice(cliente, 1)
    })
}