const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.post('/', (req, res) => {
    const {name, email, password} = req.headers;
    db.query(`EXEC createUser '${name}', '${email}', '${password}'`, (err, resultSet) => {
        res.send(!!error);
    });
});

module.exports = router;