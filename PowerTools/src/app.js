const express = require("express");
const { PORT, HOST } = require("./config/config");
const indexRouter = require("./routes");
const app = express();
app.use(express.json());

app.use("/api", indexRouter);

app.listen(PORT, () => console.log(`Server runing at http://${HOST}:${PORT}`));