export class ClientesModel {
    constructor(cpf, email, endereco, sexo, data_nascimento, celular, id_compras, id_pagamentos, data_insercao) {
        this.cpf = cpf
        this.email = email
        this.endereco = endereco
        this.sexo = sexo
        this.data_nascimento = data_nascimento
        this.celular = celular
        this.id_compras = id_compras
        this.id_pagamentos = id_pagamentos
        this.data_insercao = data_insercao
    }
}