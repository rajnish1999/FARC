const express = require('express');
const Department = require('../models/department');
const router  = express.Router();

router.get('/', (req, res) => {
    Department.find({}).then((departments) => {
        console.log(departments);
        res.render('index.ejs', {
            departments
        }).catch((error) => {
            console.log("error", error);
        })
    })
});

module.exports = router;