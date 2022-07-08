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
            if(error) reject("Erro ao listar banco")
            else resolve(resultado)
              })
        })
    }

    addProdutos(Produto) {
        return new Promise ((resolve, reject) => {
            this.database.run(
                `INSERT INTO PRODUTOS (nome, cor, marca, peso, tamanho, valor, descricao, id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [Produto.nome, Produto.cor, Produto.marca, Produto.peso, Produto.tamanho, Produto.valor, Produto.descricao, Produto.id],
                (error) => {
                  if(error) reject("Erro ao adicionar banco")
                  else resolve("Valor inserido")
                })
        })
    }

    alterarProdutos(produtosAtualizados) {
        return new Promise((resolve, reject) => {
            this.database.run(`UPDATE PRODUTOS 
            SET nome = ?, cor = ?, marca = ?, peso = ?, tamanho = ?, valor = ?, descricao = ? WHERE id = ?`, produtosAtualizados,
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