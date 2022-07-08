export class ProdutosDao {
    constructor(database) {
        this.database = database;
    }

    listarProdutos() {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT * FROM PRODUTOS`, (error, resultado) => { 
                if (error) reject("Erro ao inserir o banco")
                else resolve(resultado)
              })
        })
    }

    listarProdutosID(id) {
      return new Promise((resolve, reject) => {
        this.database.all(`SELECT * FROM PRODUTOS WHERE id = ${id}`, (error, resultado) => {
            if(error) reject("Erro ao adicionar o banco")
            else resolve(resultado)
              })
        })
    }

    addProdutos(Produto) {
        return new Promise ((resolve, reject) => {
            this.database.run(
                `INSERT INTO PRODUTOS (id, nome, cor, marca, peso, tamanho, valor, descricao) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [Produto.id, Produto.nome, Produto.cor, Produto.marca, Produto.peso, Produto.tamanho, Produto.valor, Produto.descricao],
                (error) => {
                  if(error) reject("Erro ao adicionar o banco")
                  else resolve("Valor inserido")
                })
        })
    }

    alterarProdutos(parametro) {
        return new Promise((resolve, reject) => {
            this.database.run(`UPDATE PRODUTOS 
            SET nome = ?, cor = ?, marca = ?, peso = ?, tamanho = ?, valor = ?, descricao = ? WHERE id = ?`, parametro,
                (error) => {
                  if(error) reject ("Erro ao atualizar produto")
                  else resolve("Produto atualizado")
                })
        }) 
    }

    deletaProdutos(id) {
        return new Promise((resolve, reject) => {
            this.database.run(`DELETE FROM PRODUTOS WHERE id = ${id}`,
                (error) => {
                  if(error) reject (error.message)
                  else resolve("Produto deletado")
                })
        })
    }
}