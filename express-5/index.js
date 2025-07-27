const erxpress = require("express");
const app = erxpress();
app.use(erxpress.json())
const cors = require("cors");
const { connectDB } = require("./config/db");
app.use(cors());
const UploadRoute = require("./routes/upload.route");
const CategoryRoute = require("./routes/category.route");
const ProductRoute = require("./routes/product.routes");
const UserRoute = require("./routes/user.route");
app.use("/uploads", erxpress.static(__dirname + "/uploads"))

connectDB()

app.use("/upload", UploadRoute)
app.use("/category", CategoryRoute)
app.use("/product", ProductRoute);    
app.use("/user", UserRoute);    

app.listen(3000, () => console.log("Server runing 3000 port"))