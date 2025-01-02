const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        require : true
    }
},{timestamps : true});

const CrudAppDb = mongoose.model('CrudAppDb',schema);
module.exports = CrudAppDb;