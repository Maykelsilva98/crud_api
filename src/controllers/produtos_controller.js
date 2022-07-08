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
      const novoProduto = new Produtos(body.nome, body.cor, body.marca, body.peso, body.tamanho, body.valor, body.descricao)
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

      app.put('/produtos/:id', (req, res) => { 
        const body = req.body;
        const id = req.params.id;
        const parametro = 
        [body.nome, body.cor, body.marca, body.peso, body.tamanho, body.valor, body.descricao, id]
        const data = async() => {
          try{
            const produtos = await dadosDao.alterarProdutos(parametro)
            res.status(201).json(produtos)
          }catch(error) {
            res.status(404).json(error)
          }
        }
        data(); 
    }); 

      app.delete('/produtos/:id', (req, res) => { 
        const data = async() => {
          try{
              const produtos = await dadosDao.deletaProdutos(req.params.id)
              res.status(201).json(produtos)
          }catch(error) {
              res.status(404).json(error)
          }
        }
        data(); 
    }) 
};
