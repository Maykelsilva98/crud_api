import supertest from 'supertest';
const UrlAPI = "http://localhost:3000";

describe('UrlAPI', () => {
    test('TESTANDO ROTA COMPRAS', ()=>{
        return request(UrlAPI).get('/compras')
        .then((resposta) =>{
                expect(resposta.statusCode).toBe(200);
        })
    })
})