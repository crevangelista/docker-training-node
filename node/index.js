const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const ddl = 'CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255) not null, primary key(id))'
connection.query(ddl)
const sql = `INSERT INTO people(name) values('Carlos Evangelista')`
connection.query(sql)

app.get('/', (req,res) => {

    let resposta = '<h1>Full Cycle Rocks!</h1><br>'
    const sql = 'select id, name from people'

    connection.query("select id, name from people", function (err, result, fields) {
        if (err) throw err;
        
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            console.log(row.id, row.name)
            resposta = resposta + '<h3>'+ row.id + ' - '+ row.name +'</h3>'
        });
        res.send(resposta);
      });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})