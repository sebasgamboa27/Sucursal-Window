const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {user,password} = req.headers;
    console.log({
        user: req.headers.user, 
        password: req.headers.password
    });
    db.query(`EXEC login '${user}', '${password}'`, (error, resultSet) => {
        console.log(error);
        if(error){
            res.send(false);
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