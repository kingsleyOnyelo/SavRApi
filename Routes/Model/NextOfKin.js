const mongoose = require('mongoose');


NextOfKinSchema = new mongoose.Schema({
    pinNumber:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required:true
    }
});

const NextOfKin = mongoose.model('nextOfKin', NextOfKinSchema);

module.exports = NextOfKin;