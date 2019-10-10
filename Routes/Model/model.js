const mongoose = require('mongoose');


SaversSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
      email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
});


const Savers = mongoose.model('savers', SaversSchema);

module.exports = Savers;