const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleData = new Schema({
    email:{
        type:String,
        default:null,
        required:true
    },
    data:{
        type:String,
        default:null,
        required:true
    },
    name:{
        type:String,
        default:null,
        required:true
    },
    products: Schema.Types.Mixed,
    id:{
        type:String,
        default: null,
        required: true
    }
})

module.exports = mongoose.model('articleData',articleData);