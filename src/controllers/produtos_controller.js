import { Produtos } from "../models/produtos_models.js";

export const produtos = (app, bd) => {
  
    app.get("/produtos", (req, res) => {
      //res.send("Rastreamento da aplicação");
      res.json({ MeuBanco: bd.produtos });
    })

    app.post("/produtos", (req, res) => {
        const body = req.body;
        const NovoProduto = new Produtos(body.nome, body.cor, body.marca, body.peso, body.tamanho, body.valor, body.descricao);
        bd.produtos.push(NovoProduto)
        res.json({ NovoProduto: NovoProduto });
      });

      app.get("/produtos/:nome", (req, res) => {
        const param = req.params.nome;
        const product = bd.produtos;
        res.send(product.filter((el) => el.nome == param)); 
      }); 

      app.delete('/produtos/:cor', (req, res) => {
        const param = req.params.cor
        const produtos = bd.produtos
        const cor = produtos.filter(el => el.cor == param)
        const sucessMsg = {
          "message": `${param} deletado`
        }
        const failMsg = {
          "message": `${param} não encontrado`
        }
    
        if(cor.length > 0){
          produtos.splice(produtos.indexOf(cor), 1)
        }
        
        res.send(cor.length !== 0 ? sucessMsg : failMsg)
      })

      app.put('/produtos/:nome', (req, res) => {
        const param = req.params.nome;
        const produtos = bd.produtos
        const body = req.body;
        const dadoAntigoIndex = produtos.map(el => el.nome).indexOf(param)
        const dadoAntigo = produtos[dadoAntigoIndex]
        if(dadoAntigoIndex > -1){
          const novoProdutos = new Produtos(
            body.nome || dadoAntigo.nome,
            body.cor || dadoAntigo.cor,
            body.marca || dadoAntigo.marca,
            body.peso || dadoAntigo.peso,
            body.tamanho || dadoAntigo.tamanho,
            body.valor || dadoAntigo.valor,
            body.descricao || dadoAntigo.descricao,
          )
            res.json({
              "Produtos novos": produtos[dadoAntigoIndex],
              "para": novoProdutos
            })
            produtos.splice(dadoAntigoIndex, 1, novoProdutos)
        } else{
          res.send("produto não encontrado")
        }
      })
};
