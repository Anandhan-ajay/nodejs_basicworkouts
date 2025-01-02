const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Db is connected");
    } catch (error) {
        console.log(error);
    }
}

exports.connectDb = connectDb