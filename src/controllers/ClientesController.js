import { ClientesModel } from "../models/ClientesModel.js"
import { ClientesDAO } from "../dao/ClientesDAO.js"

export const ClientesController = (app, db) => {
    const dao = new ClientesDAO(db)
    
    app.get("/clientes", async (req, res) => {
        try {
            const clientes = await dao.getClientes()

            res.send(clientes)
        } catch (error) {
            console.log(error)

            res.json({
                "Error": error.message
            })
        }
    })

    app.get("/clientes/:id", async (req, res) => {
        const id = req.params.id

        try {
            const result = await dao.getClientesByID(id)

            res.send(result)
        } catch(error) {
            res.json({
                "Error": error.message
            })
        }
    })

    app.post("/clientes", async (req, res) => {
        const body = req.body
        const novoCliente = new ClientesModel(
            body.cpf, 
            body.email, 
            body.endereco, 
            body.sexo, 
            body.data_nascimento, 
            body.celular, 
            body.id_compras, 
            body.id_pagamentos, 
            body.data_insercao
        )
        
        try {
            const cliente_inserido = await dao.addCliente(novoCliente)
            res.send(cliente_inserido)
        } catch (error) {
            res.json({
                "Error": error.message
            })
        }

    })


    app.put("/clientes/:id", async (req, res) => {
        const body = req.body
        const param = req.params.id
        const clienteAntigo = await dao.getClientesByID(param)

        const clienteNovo = new ClientesModel(
            body.CPF || clienteAntigo.cpf, 
            body.EMAIL || clienteAntigo.email, 
            body.ENDERECO || clienteAntigo.endereco, 
            body.SEXO || clienteAntigo.sexo, 
            body.DATA_NASCIMENTO || clienteAntigo.data_nascimento, 
            body.CELULAR || clienteAntigo.celular, 
            body.ID_COMPRAS || clienteAntigo.id_compras, 
            body.ID_COMPRAS || clienteAntigo.id_pagamentos, 
            body.DATA_INSERCAO || clienteAntigo.data_insercao
        )
        
        try {
            await dao.updateCliente(param, clienteNovo)

            res.json({
                "Dado antigo" : clienteAntigo, 
                "Dado novo": await dao.getClientesByID(param)
            })
        } catch (error) {
            res.json({
                "Error": error.message
            })
        }
    })

    app.delete("/clientes/:id", async (req, res) => {
        const param = req.params.id

        try {
            const cliente_deletado = await dao.removeCliente(param)
            res.send(cliente_deletado)
        } catch (error) {
            res.json({
                "Error": error.message
            })
        }
    })
}