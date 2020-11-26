const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

router.get('/specificHospital/:id', (req, res) => {
    const hospId = req.params.id;
    Hospital.findOne({hId : hospId}).then((hospital) => {
        res.render('specificHospital',{
            hospital
        })
    })
})

module.exports = router;