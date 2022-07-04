export class ComprasDAO{
    constructor(bd){
        this.bd = bd;
    }

    listarCompras(){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM COMPRAS`, (error, result) => {
              if (error) {
                reject("Erro ao selecionar o banco")
              } else {
                resolve({ "TABLE SELECTED": result });
              }
            })
          })
    }

    inserirCompras(novaCompra){
        return new Promise((resolve, reject) => {
            this.bd.run('INSERT INTO COMPRAS (id, data_compra, id_estoque, id_cliente) VALUES (?,?,?,?)', [novaCompra.id, novaCompra.data_compra, novaCompra.id_estoque, novaCompra.id_cliente], (error) => {
              if (error) {
                reject('Erro ao inserir compra')
              } else {
                resolve("Compra inserida com sucesso")
              }
            })
          })
    }

    listarComprasID(id) {
        return new Promise((resolve, reject) => {
          this.bd.all('SELECT * FROM COMPRAS WHERE id = ?', [id], (error, rows) => {
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
          this.bd.run('UPDATE COMPRAS SET DATA_COMPRA = ?, ID_ESTOQUE = ?, ID_CLIENTE = ? WHERE id = ?' , compraAtualizada, (error) => {
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