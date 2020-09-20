const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email,state} = req.headers;
    console.log(email,state);
    db.query(`UPDATE Rep_Sucursal SET Enabled = ${state} WHERE '${email}' = Email`, (error, resultSet) => {
        if(error != null){
            res.send(null);
        }else {
            res.send('actualizado exitosamente');
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(true);
});

module.exports = router;