const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type : String
    },
    // accountOpenAt:{
    //     type:String,
    //     require:true
    // },
    block:{
      type:Number
    },
    image: {
        type: String
    }
});


const user = mongoose.model('user', userSchema);

module.exports = {
    user
};