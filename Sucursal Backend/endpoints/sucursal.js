const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`EXEC getSucursalByUser '${email}'`, (error, resultSet) => {
        console.log(error);
        if(error){
            res.send(null);
        }else {
            res.send(resultSet.recordset[0]);
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(true);
});

router.put('/', (req, res) => {
    const {email,state} = req.body;
    console.log(email,state);
    db.query(`UPDATE Rep_Sucursal SET Enabled = ${state} WHERE '${email}' = Email`, (error, resultSet) => {
        if(error != null){
            res.send(null);
        }else {
            res.send('actualizado exitosamente');
        }
    });
});

router.delete('/', (req, res) => {
    const {email} = req.headers;
    db.query(`DELETE FROM Rep_Sucursal WHERE '${email}' = Email`, (error, resultSet) => {
        if(error != null){
            res.send(null);
        }else {
            res.send('borrado exitosamente');
        }
    });
});

module.exports = router;