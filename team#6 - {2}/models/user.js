const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:integer,
        required:true
    }
})