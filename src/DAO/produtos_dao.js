export class ProdutosDao {
    constructor(database) {
        this.database = database;
    }

    listarProdutos() {
        return new Promise((resolve, reject) => {
            this.database.query(`SELECT * FROM PRODUTOS`, (error, resultado) => { 
                if (error) reject("Erro ao acessar o banco")
                else resolve(resultado)
              })
        })
    }

    listarProdutosID(id) {
      return new Promise((resolve, reject) => {
        this.database.query(`SELECT * FROM PRODUTOS WHERE id = ${id}`, (error, resultado) => {
            if(error) reject("Erro ao listar banco")
            else resolve(resultado)
              })
        })
    }

    addProdutos(Produto) {
        return new Promise ((resolve, reject) => {
            this.database.query(
                `INSERT INTO PRODUTOS (id, nome, cor, marca, peso, tamanho, valor, descricao, imagem_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [Produto.id, Produto.nome, Produto.cor, Produto.marca, Produto.peso, Produto.tamanho, Produto.valor, Produto.descricao, Produto.imagem_url],
                (error) => {
                  if(error) reject("Erro ao adicionar banco")
                  else resolve("Valor inserido")
                })
        })
    }

    alterarProdutos(produtosAtualizados, id) {
        return new Promise((resolve, reject) => {
            this.database.query(`UPDATE PRODUTOS 
            SET nome = ?, cor = ?, marca = ?, peso = ?, tamanho = ?, valor = ?, descricao = ?, imagem_url=?  WHERE id = ?`, produtosAtualizados,
                (error) => {
                  if(error) reject ("Erro ao atualizar produto")
                  else resolve("Produto atualizado")
                })
        }) 
    }

    deletaProdutos(id) {
        return new Promise((resolve, reject) => {
            this.database.query(`DELETE FROM PRODUTOS WHERE id = ${id}`,
                (error) => {
                  if(error) reject (error.message)
                  else resolve("Produto deletado")
                })
        })
    }
}