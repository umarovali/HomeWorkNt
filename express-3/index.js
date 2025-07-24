const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { connectDB } = require("./config/db");
const AuthorRoute = require("./routes/author.route");
const BookRoute = require("./routes/book.route");



connectDB()

app.use("/author", AuthorRoute)
app.use("/book", BookRoute)






app.listen(3000, () => console.log("Server runing 3000 port"))