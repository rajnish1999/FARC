const mongoose = require('mongoose');
const validator = require('validator');

const hospital = mongoose.model('hospital', {
    h_id: {
        type: Number,
        required: true,
        trim: true
    },
    h_name: {
        type: String,
        required: true,
        trim: true
    },
    dpment: {
        type: [Number],
    },
    totalBeds: {
        type: Number,
        trim: true
    },
    bedsAvailable: {
        type: Number,
        trim: true
    },
    contactNo: {
        type: String,
        trim: true
    },
    addressH: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
})

module.exports = hospital;