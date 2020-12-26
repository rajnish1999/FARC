const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const Department = require('../models/department');

router.get('/doctorsOfThisDepartment/:id', (req, res) => {
    const hospId = req.params.id;
    let doctors = [];

    let departments = [];
    Department.find({}).then((departmentsArray) => {
        departments = departmentsArray
    }).catch((error) => {
        console.log(error);
    })

    Doctor.find({}).then((doctorsArr) => {
        for(let i=0;i<doctorsArr.length;i++){
            if(doctorsArr[i].hId == hospId){
                doctors.push(doctorsArr[i]);
            }
        }
        res.render('doctorsOfThisDepartment',{
            doctors,
            departments
        })
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;