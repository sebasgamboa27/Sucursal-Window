const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();


// este es el string de conexion con la base de datos de sql server

let dbConnString = `aqui va el string de conexion a la BD`;

app.use(cors());
app.use(bodyParser.json());

// funcion que conecta el backend con el frontend
app.listen(3000, function () {
  console.log('Sucursal server listening on port 3000');
});


// Ejemplo de funcion para hacer los querys

app.post('/queryExample', async function (req, res) {
  await sql.connect(dbConnString);
  
  const result = await sql.query(`Ejemplo de query`);                

  res.send(result.recordset);
});