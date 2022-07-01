//let id = 0;
import {bd} from "../infra/bd.js"
export class Produtos {
    constructor(nome, cor, marca, peso, tamanho, valor, descricao) {
        this.id = bd.produtos.length+1,
        this.nome = nome;
        this.cor = cor;
        this.marca = marca;
        this.peso = peso;
        this.tamanho = tamanho;
        this.valor = valor;
        this.descricao = descricao;
    }
};