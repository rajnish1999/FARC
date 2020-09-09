const mongoose = require('mongoose');
const validator = require('validator');

const test = mongoose.model('test', {
    test_id: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if(value < 0){
                throw new Error('id must be a positive number');
            }
        }
    },
    test_name: {
        type: String,
        required: true,
        trim: true
    },
    test_price: {
        type: Number,
        required: true,
        trim: true
    }

})

const t1 = new test({
    test_id:1,
    test_name: "ki",
    test_price: 20
})
t1.save().then(()=>{
    console.log("ok");
}).catch((error) => {
    console.log(error);
})
module.exports = test;