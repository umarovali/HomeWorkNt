const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/home-5")
        .then(() => console.log("Connect to db"))
        .catch((err) => console.log(err))
}

module.exports = { connectDB };