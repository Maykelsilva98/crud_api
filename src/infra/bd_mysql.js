import mysql from 'mysql';

export const bd_mysql = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bbbd8585290e55',
    password: '7be1286c',
    database: 'heroku_3f498504f32a942'
})

