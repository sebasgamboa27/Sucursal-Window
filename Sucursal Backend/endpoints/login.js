const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {user,password} = req.headers;
    db.query(`EXEC login '${user}', '${password}'`, (error, resultSet) => {
        if(error){
            res.send(false);
        }else {
            res.send(resultSet.recordset);
        }
    });
});

router.post('/', (req, res) => {
    res.send(true);
});

module.exports = router;