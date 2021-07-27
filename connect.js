const mysql = require('mysql2');
require('dotenv').config();
if (document.title==='Registro Mysql'){
    localStorage.setItem('host',document.getElementById('host').value);
    localStorage.setItem('user',document.getElementById('user').value);
    localStorage.setItem('password',document.getElementById('password').value);
    localStorage.setItem('database',document.getElementById('database').value);
    localStorage.setItem('port',document.getElementById('port').value)
}
process.env.host = localStorage.getItem('host');
process.env.user = localStorage.getItem('user');
process.env.password = localStorage.getItem('password');
process.env.database = localStorage.getItem('database');
process.env.port = localStorage.getItem('port');
const host = process.env.host;
const usuario = process.env.user;
const contrasenia = process.env.password;
const baseDeDatos = process.env.database;
const puerto = process.env.port;
const connection = mysql.createConnection({
    host:host,
    user:usuario,
    password:contrasenia,
    database:baseDeDatos,
    port:puerto
});
connection.connect(function(err){
    var name = document.title;
    if(err){
        document.getElementById('txtData').value = err.code+'\n'+err.fatal+'\nerror\n';
        localStorage.removeItem('host');
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        localStorage.removeItem('database');
        localStorage.removeItem('port');
        // setTimeout( function(){
        //     location.href='./index2.html'
        // }, 3000);
    }else{
        if(name == 'Registro Mysql'){
            document.getElementById('txtData').value = `host: ${host} user: ${usuario} password: ${contrasenia} database: ${baseDeDatos} port: ${puerto}\nConexión exitosa`;
            setTimeout( function(){
                location.href='./index3.html';
            }, 4000);
        }
    }
});

module.exports = connection;