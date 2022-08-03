import {v4} from 'uuid';

export class Produtos {
    constructor(nome, cor, marca, peso, tamanho, valor, descricao, imagem_url) {
        this.id = v4();
        this.nome = nome;
        this.cor = cor;
        this.marca = marca;
        this.peso = peso;
        this.tamanho = tamanho;
        this.valor = valor;
        this.descricao = descricao;
        this.imagem_url = imagem_url
    }
};