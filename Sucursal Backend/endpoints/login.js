const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    console.log({
        user: req.headers.user, 
        password: req.headers.password
    });
    db.query('select * from Test', (error, resultSet) => {
        if(!error){
            res.send(resultSet);
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send(true);
});

module.exports = router;