const mongoose = require('mongoose');
const validator = require('validator');

const Hospital = mongoose.model('Hospital', {
    address: {
        type: String,
        trim: true
    },
    beds: {
        type: Number,
        trim: true
    },
    bedsAvailable: {
        type: Number,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    depts: {
        type: [Number],
    },
    hId: {
        type: Number,
        required: true,
        trim: true
    },
    hName: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
})
// const hospital = new Hospital({
//     "address" : "Guru Teg Bahadur Hospital, Dilshad Garden, Delhi, 110095",
//     "beds" : 143,
//     "bedsAvailable" : 221,
//     "contact" : "01122586262",
//     "depts" : [ 2, 4, 8, 11, 6, 13 ],
//     "hId" : 3,
//     "hName" : "Guru Teg Bahadur Hospital",
//     "link" : "https://goo.gl/maps/msW8sbU6BD82"
//   })

// hospital.save().then(() => {

// }).catch((e) => {

// })

module.exports = Hospital;