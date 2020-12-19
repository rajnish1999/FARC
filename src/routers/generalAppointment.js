const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

router.get('/generalAppointment',(req,res) => {
    const user = req.user;
    const hospId = user.hospAppointment[user.hospAppointment.length-1].split('+')[0];
    const dateOfApp = user.hospAppointment[user.hospAppointment.length-1].split('+')[1];

    Hospital.findOne({hId : hospId}).then((hospital) => {
        res.render('generalAppointment', {
            user,
            dateOfApp,
            hName : hospital.hName
        })
    }).catch((err) => {
        console.log("hello"+err);
    })
})

module.exports = router