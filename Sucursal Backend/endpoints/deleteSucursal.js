const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`DELETE FROM Rep_Sucursal WHERE '${email}' = Email`, (error, resultSet) => {
        if(error != null){
            res.send(null);
        }else {
            res.send('borrado exitosamente');
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(true);
});

module.exports = router;