// const mongoose = require('mongoose');

// const Appointment = mongoose.model('Appointment', {
//     date : String,
//     appointmentsDone : {
//         Number,
//         trim:true,
//     },
//     patients : [String]
// })

// module.exports = Appointment 

const ob = new Date();
ob.setDate(ob.getDate()+1);
console.log(ob.toDateString());