const express = require('express');
const router = express.Router();
const dbDriver = require('../database/database');

const db = new dbDriver.Request();

router.get('/', (req, res) => {
    const {email} = req.headers;
    db.query(`SELECT p.Code FROM Permission as p, Permission_x_User as pu, [User] as u WHERE p.PermissionId = pu.PermissionId
    AND pu.UserId = u.UserId AND u.email = '${email}'`, (error, resultSet) => {
        if(error){
            res.send(false);
        }else {
          console.log(resultSet.recordset);
          res.send(resultSet.recordset);
        }
    });
});

router.post('/', (req, res) => {
  res.send(true);
});


module.exports = router;