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

module.exports = router;