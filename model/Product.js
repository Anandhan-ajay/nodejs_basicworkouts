const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Product = mongoose.model("Product", schema)
module.exports = Product