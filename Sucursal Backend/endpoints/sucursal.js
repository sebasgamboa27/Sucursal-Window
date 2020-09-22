const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`EXEC getSucursalByUser '${email}'`, (error, resultSet) => {
        if(error){
            res.send(null);
        }else {
            res.send(resultSet.recordset[0]);
        }
    });
});

router.post('/', (req, res) => {
    res.send(true);
});

router.put('/', (req, res) => {
    const {email,state} = req.headers;
    db.query(`EXEC state_sucursal '${email}', ${state}`, (error, resultSet) => {
        if(error != null){
            res.send(null);
        }else {
            res.send('actualizado exitosamente');
        }
    });
});

module.exports = router;