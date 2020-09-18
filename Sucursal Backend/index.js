const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

//To use in localhost
app.use(cors());

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());


//Routes
const login = require('./endpoints/login');
const sucursal = require('./endpoints/sucursal');

app.use('/login', login);
app.use('/sucursal', sucursal);

app.listen(3000);