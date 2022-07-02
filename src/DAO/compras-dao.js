export class ComprasDAO{
    constructor(bd){
        this.bd = bd
    }

    listarCompras(){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM COMPRAS`, (error, result) => {
              if (error) {
                reject("Erro ao selecionar o banco")
              } else {
                resolve({ "TABLE SELECIONADA": result });
              }
            })
          })
    }

    inserirCompras(id){
        return new Promise((resolve, reject) => {
            this.bd.all('SELECT * FROM COMPRAS  WHERE id = ?', [id], (error, rows) => {
              if (error) {
                reject({ "ERRO": error.message })
              } else {
                resolve({ "Compras": rows })
              }
            })
          })
    }

    listarComprasID(id) {
        return new Promise((resolve, reject) => {
          this.bd.all('SELECT * FROM USUARIOS  WHERE id = ?', [id], (error, rows) => {
            if (error) {
              reject({ "ERRO": error.message })
            } else {
              resolve({ "usuarios": rows })
            }
          })
        })
    }

    alterarCompra(compraAtualizada) {
        return new Promise((resolve, reject) => {
          this.bd.run('UPDATE COMPRAS SET DATA_COMPRA = ?, ID_ESTOQUE = ?, ID_CLIENTE = ? WHERE id = ?' , (error) => {compraAtualizada
            if (error) reject('Não foi possível atualizar o usuário');
            else resolve('Usuário atualizado');
          });
        })
    }

    deletarCompra(id) {
        return new Promise((resolve, reject) => {
          this.bd.run(`DELETE FROM COMPRAS WHERE ID=${id}`,
            (err) => {
              if (err) {
                reject(err)
              } else {
                resolve('Usuário deletado com sucesso')
              }
            })
        })
    }
}