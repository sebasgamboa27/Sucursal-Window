const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`SELECT u.UserId,u.name FROM [User] as u WHERE u.email = '${email}'`, (error, resultSet) => {
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