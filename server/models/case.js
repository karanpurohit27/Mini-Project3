const mongoose = require('mongoose')


const caseSchema = new mongoose.Schema({
    msg_id: {
        type:String,
        required:[true,"can't be blank"],
        trim: true
    },
    token: {
        type:String,
        required: false,
        default: null,
        trim: true
    },
    user_id: {
        type:String,
        required: false,
        default: null,
        trim: true
    },
    
    role:{
        type: String,
        enum: ['lawyer','judge'],
        default: 'lawyer',
        // required:true
    }
},
{timestamps:true})

const userModel =  mongoose.model('user',UserSchema);

module.exports = userModel;