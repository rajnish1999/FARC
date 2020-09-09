const mongoose = require('mongoose');

const department = mongoose.model('department', {
    deptId: {
        type: Number,
        required: true,
        trim: true
    },
    deptName: {
        type: String,
        required: true,
        trim: true
    },
    h_id: [Number],
    test_id: [Number]
})



module.exports = department