const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb+srv://umarovali345:aEa4fqQuGJlafGi0@cluster0.73mvfpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Connect to db"))
        .catch((err) => console.log(err))
}

module.exports = { connectDB };