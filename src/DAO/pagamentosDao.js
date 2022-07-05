export class PagamentosDao{
    constructor(bd){
        this.bd = bd
    }

    getPagamentos(){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM PAGAMENTOS`, (error, result) =>{
                if (error){
                    reject("Erro ao acessar o banco.")
                }else{
                    resolve(result)
                }
            })
        })
    }

    getPagamentosId(id){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM PAGAMENTOS WHERE ID = ${id}`, (error, result) =>{
                if (error){
                    reject("Erro ao acessar o dado.")
                }else{
                    resolve(result)
                }
            })
        })
    }

    postPagamentos(pagamentoNovo){
        return new Promise((resolve, reject) =>{
            this.bd.run(
            "INSERT INTO PAGAMENTOS (cliente_id, valor, data, forma_pagamento, id_compras) VALUES (?, ?, ?, ?, ?)",
            [pagamentoNovo.cliente_id, pagamentoNovo.valor, pagamentoNovo.data, pagamentoNovo.forma_pagamento, pagamentoNovo.id_compras], 
            (error) =>{
                if(error){
                    reject("Erro ao inserir um dado de pagamento novo.")
                } else{
                    resolve("Dado inserido com sucesso.")
                }
            }
            )    
        })
    }

    deletePagamentos(id){
        return new Promise((resolve, reject) =>{
            this.bd.run(`DELETE FROM PAGAMENTOS WHERE ID=?`, id,
            (error) =>{
                if(error){
                    reject("Não foi possível remover o dado.")
                }else{
                    resolve("Dado removido com sucesso.")
                }
            }
            )
        })
    }

    putPagamentos(id, pagamentoAtualizado){
        return new Promise((resolve, reject) =>{
            this.bd.run(`UPDATE PAGAMENTOS SET CLIENTE_ID = ?, VALOR = ?, DATA = ?, FORMA_PAGAMENTO = ?, ID_COMPRAS = ? WHERE ID = ?`,
            [pagamentoAtualizado.cliente_id, pagamentoAtualizado.valor, pagamentoAtualizado.data, pagamentoAtualizado.forma_pagamento, pagamentoAtualizado.id_compras, id],
            (error) =>{
                if(error){
                    reject("Erro ao atualizar o dado.")
                }else{
                    resolve("Dado atualizado com sucesso.")
                }
            })
        })
        
    }   
}
