require("dotenv").config();

const PORT = process.env.PORT ?? 4000;
const HOST = process.env.HOST;
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;
const USER_NAME = process.env.USER_NAME;
const SECKRETKEY = process.env.SECKRETKEY;

module.exports = { PORT, HOST, DB, PASSWORD, USER_NAME, SECKRETKEY };