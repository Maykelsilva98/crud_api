export class ClientesDAO {
    constructor(database) {
        this.database = database
    }

    async getClientes() {
        return new Promise((resolve, reject) => {
            this.database.all("SELECT * FROM CLIENTES", (error, result) => {
                if (error) {
                    reject(error)
                } 
                
                resolve(result)
            })
        })
    }

    async getClientesByID(id) {
        return new Promise((resolve, reject) =>{
            this.database.all(`SELECT * FROM CLIENTES WHERE ID = ${id}`, (error, result) =>{
                if (error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }

    async addCliente(cliente) {
        return new Promise((resolve, reject) => {
            this.database.run("INSERT INTO CLIENTES (cpf, email, endereco, sexo, data_nascimento, celular, id_compras, id_pagamentos, data_insercao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [cliente.cpf, cliente.email, cliente.endereco, cliente.sexo, cliente.data_nascimento, cliente.celular, cliente.id_compras, cliente.id_pagamentos, cliente.data_insercao], (error) => {
                if (error) {
                    reject(error)
                } 
                
                resolve({
                    "cliente inserido com sucesso": cliente
                })
            })
        })
    }

    async removeCliente(id) {
        return new Promise((resolve, reject) =>{
            this.database.run(`DELETE FROM CLIENTES WHERE ID=?`, id,
            (error) =>{
                if(error){
                    reject(error)
                }else{
                    resolve("Cliente removido com sucesso")
                }
            }
            )
        })
    }

    async updateCliente(id, clienteAtualizado) {
        return new Promise((resolve, reject) =>{
            this.database.run(`UPDATE CLIENTES SET cpf = ?, email = ?, endereco = ?, sexo = ?, data_nascimento = ?, celular = ?, id_compras = ?, id_pagamentos = ?, data_insercao = ? WHERE ID = ?`,
            [clienteAtualizado.cpf, clienteAtualizado.email, clienteAtualizado.endereco, clienteAtualizado.sexo, clienteAtualizado.data_nascimento, clienteAtualizado.celular, clienteAtualizado.id_compras, clienteAtualizado.id_pagamentos, clienteAtualizado.data_insercao, id],
            (error) =>{
                if(error){
                    reject(error)
                }else{
                    resolve("Dado atualizado com sucesso.")
                }
            })
        })
    }
}