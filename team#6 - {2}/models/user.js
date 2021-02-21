const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userData = new Schema({
    name:{
        type:String,
        default:null,
        required:true
    },
    email:{
        type:String,
        default:null,
        required:true
    },
    password:{
        type:String,
        default:null,
        required:true
    },
    gender:{
        type:String,
        default:null,
        required:true
    },
    date:{
        type:Date,
        default:null,
        required:true
    }
})

module.exports = mongoose.model('userData',userData);