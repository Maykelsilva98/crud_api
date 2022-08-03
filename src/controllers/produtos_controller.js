import { Produtos } from "../models/produtos_models.js";
import { ProdutosDao } from "../DAO/produtos_dao.js";


export const produtos = (app, bd) => {

  const dadosDao = new ProdutosDao(bd)

    app.get("/produtos", (req, res) => {
      const data = async() => {
        try{
          const produtos = await dadosDao.listarProdutos()
          res.status(200).json(produtos)
        }catch(error) {
          res.status(404).json(error)
        }
      }
      data();
    })

    app.get("/produtos/:id", (req, res) => {
      const data = async() => {
        try{
          const produtos = await dadosDao.listarProdutosID(req.params.id)
          res.status(200).json(produtos)
        }catch(error) {
          res.status(404).json(error)
        }
      }
      data();
    });      

    app.post("/produtos", (req, res) => {
      const body = req.body;
      const novoProduto = new Produtos(body.nome, body.cor, body.marca, body.peso, body.tamanho, body.valor, body.descricao, body.imagem_url)
      const data = async() => {
        try{
          const produtos = await dadosDao.addProdutos(novoProduto)
          res.status(201).json(produtos)
        }catch(error) {
          res.status(404).json(error)
        }
      }
      data();
    });

    app.put('/produtos/:id', async (req, res) => { 
      const id = req.params.id;
      const produtosDadosAntigos = await dadosDao.listarProdutosID(id);
      console.log(produtosDadosAntigos[0])
      const dadoNovo = req.body;

      const produtosAtualizados = new Produtos(
            dadoNovo.nome || produtosDadosAntigos[0].NOME, 
            dadoNovo.cor || produtosDadosAntigos[0].COR, 
            dadoNovo.marca || produtosDadosAntigos[0].MARCA,
            dadoNovo.peso || produtosDadosAntigos[0].PESO,
            dadoNovo.tamanho || produtosDadosAntigos[0].TAMANHO,
            dadoNovo.valor || produtosDadosAntigos[0].VALOR,
            dadoNovo.descricao || produtosDadosAntigos[0].DESCRICAO,
            dadoNovo.imagem_url || produtosDadosAntigos[0].IMAGEM_URL
            ) 
        console.log(produtosDadosAntigos)
        console.log(produtosAtualizados)
                      
      const parametro = 
      [produtosAtualizados.nome, 
        produtosAtualizados.cor, 
        produtosAtualizados.marca, 
        produtosAtualizados.peso, 
        produtosAtualizados.tamanho, 
        produtosAtualizados.valor, 
        produtosAtualizados.descricao, 
        produtosAtualizados.imagem_url,
        id]
        try{
          const produtos = await dadosDao.alterarProdutos(parametro)
          res.status(200).json({"Dado antigo" : produtosDadosAntigos[0], "Dado novo": await dadosDao.listarProdutosID(id)})
        }catch(error) {
          res.status(404).json(error)
        }
      }
    ); 

      app.delete('/produtos/:id', (req, res) => { 
        const data = async() => {
          try{
            const produto = await dadosDao.listarProdutosID(req.params.id) 
            console.log(produto)
              if(produto.length == 0){
                throw 'Produto não encontrado'
              } 
              const produtos = await dadosDao.deletaProdutos(req.params.id)
              res.status(201).json(produtos)
          }catch(error) {
              res.status(404).json(error)
          }
        }
        data(); 
    }) 
};
