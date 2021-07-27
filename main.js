if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
require('dotenv').config();
let con;
function borrarDatos(){
    localStorage.removeItem('host');
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('database');
    localStorage.removeItem('port');
    location.href='./index2.html'
}
function validarDatos(){
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    process.env.host=localStorage.getItem('host');
    if(user=='Omar' && password=='1234'){
        if (process.env.host != 'null'){
            location.href='./index3.html';
        } else{
            location.href='./index2.html';
        }
    }
    else{
        alert('Datos erroneos');
    }
}
function sendParams(){
    con = require('./connect');
}
function addData(){
    con = require('./connect');
    // Crear query para INSERT, SELECT, UPDATE O DELETE
    const nombre =  document.getElementById('nombre').value;
    const ap_pat = document.getElementById('ap_pat').value;
    const ap_mat = document.getElementById('ap_mat').value;
    const edad = document.getElementById('edad').value;

    $query = `INSERT INTO persona (nombre,ap_pat,ap_mat,edad) VALUES ("${nombre}","${ap_pat}","${ap_mat}","${edad}")`;

    con.query($query, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        console.log("Query exitoso", rows.length);
    });
    verDatos();
}
function verDatos(){
    $query = `SELECT * FROM PERSONA`;
    con.query($query, function (err, rows, fields) {
        if (err) {
            console.log('Error Query');
            console.log(err);
            alert(err);
            return;
        }
        let html='',fila1="<tr><td>id</td> <td>Nombre</td> <td>Apellido Paterno</td> <td>Apellido Materno</td> <td>Edad</td></tr>";
        rows.forEach(function(element){
            html+="<tr><td>"+element.id+"</td> <td>"+element.nombre+"</td> <td>"+element.ap_pat+"</td> <td>"+element.ap_mat+"</td> <td>"+element.edad+"</td></tr>"; 
        });
        document.getElementById('table').innerHTML = fila1;
        document.getElementById('table').innerHTML+=html;
    });
}
