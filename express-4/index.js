const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const { connectDB } = require("./config/db");
const CategoryRoute = require("./routes/category.routes");
const ProductRoute = require("./routes/product.routes");

connectDB()

app.use("/category", CategoryRoute);    
app.use("/product", ProductRoute);    




app.listen(3000, () => console.log("Server runing 3000 port"))