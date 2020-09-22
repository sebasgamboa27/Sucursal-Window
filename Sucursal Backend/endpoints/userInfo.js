const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`SELECT u.name,p.PermissionId FROM Permission_x_User as p, [User] as u WHERE p.UserId = u.UserId
    AND u.email = '${email}'`, (error, resultSet) => {
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