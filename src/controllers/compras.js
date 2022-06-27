export function compras(app){
    app.get("/compras", (req, res) => {
        res.send('Rastreamento da aplicação sendo feito com nodemon')
    })

}