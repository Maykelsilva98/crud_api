export class Produtos {
    constructor(nome, cor, marca, peso, tamanho, valor, descricao) {
        this.id = uuidv4();
        this.nome = nome;
        this.cor = cor;
        this.marca = marca;
        this.peso = peso;
        this.tamanho = tamanho;
        this.valor = valor;
        this.descricao = descricao;
    }
};