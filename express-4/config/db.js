const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb+srv://umarovali345:hxU4E3mUGifnFRYW@cluster0.7lgy485.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Connect to db"))
        .catch((err) => console.log(err))
}

module.exports = { connectDB };