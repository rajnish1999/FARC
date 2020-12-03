const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');
const Appointment = require('../models/appointment');

const datePick = () => {
    let arr = [];
    for(let i=0; i<7; i++){
        let ob = new Date();
        ob.setDate(ob.getDate() + i);
        arr.push(ob.toDateString());
        // console.log(ob.toDateString());
    }
    return arr;
}


const availabilityCount = (appointments, arr, hospId) => {
    const availabilityCountArr = [9,9,9,9,9,9,9];
    let k = 0;
    for(let j=0;j<arr.length;j++) {
        const id = hospId+"+"+arr[j];
        for(let i=0;i<appointments.length ;i++){
            if(appointments[i].appointId === id){
                availabilityCountArr[k++] = appointments[i].appointmentsAvail;
            }
        }
    }
    return availabilityCountArr;
}

router.get('/specificHospital/:id', (req, res) => {
    const hospId = req.params.id;
    let appointments = 0;
    let arrOfDates = datePick();
    Appointment.find({}).then((appoints) => {
        appointments = appoints;
    }).catch((err) => {
        console.log(err);
    })
    Hospital.findOne({hId : hospId}).then((hospital) => {
        res.render('specificHospital',{
            hospital,
            appointments,
            datesArr: arrOfDates,
            availabilityCountArr: availabilityCount(appointments, arrOfDates, hospId)
        })
    })
})

router.post('/specificHospital/:id', (req, res) => {
    let date = req.body.date;
    let hId = req.params.id;
    let user = req.user;
    
    const appointId = hId+"+"+date;
    Appointment.findOne({appointId : appointId}).then((appoint) => {
        if(!appoint){

            const appointment = new Appointment({
                "appointId": appointId,
                "appointmentsAvail": 9,
                "patients" : [user._id]
            })
            appointment.save().then(()=>{
                return res.json("appointment done");
            }).catch((err) => {
                console.log(err);
            })

        }else{
            appoint.appointmentsAvail--;
            appoint.save().then(() => {
                res.json("appointment done");
            }).catch((err) => {
                console.log(err);
            })

        }
    }).catch((err) => {
        console.log(err);
    })

    
})

module.exports = router;