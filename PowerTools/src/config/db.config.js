const mysql = require("mysql2");
const { HOST, USER_NAME, PASSWORD, DB } = require("./config");

try {
  const connection = mysql.createConnection({
    host: HOST,
    user: USER_NAME,
    password: PASSWORD,
    database: DB,
  });

  console.log("Connected to Database");
  module.exports = connection;
} catch (err) {
  console.log(err);
}
