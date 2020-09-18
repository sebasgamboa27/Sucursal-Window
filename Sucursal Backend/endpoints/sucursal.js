const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    db.query(`SELECT * FROM Rep_Sucursal`, (error, resultSet) => {
        console.log(error);
        if(error){
            res.send(null);
        }else {
            res.send(resultSet.recordset);
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(true);
});

module.exports = router;