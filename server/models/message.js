const mongoose = require('mongoose')


const msgSchema = new mongoose.Schema({
    case_id: {
        type:String,
        required:[true,"can't be blank"],
        trim: true
    },
    
    judge_id: {
        type:String,
        required: false,
        default: null,
        trim: true
    },
    
    lawyer_id:{
        type: Array,
        
        required:true
    }
},
{timestamps:true})

const msgModel =  mongoose.model('message',msgSchema);

module.exports = msgModel;