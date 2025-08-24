const db = require("../config/db.config");

const checkExistence = (table, id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ?? WHERE id = ?`;
    db.query(query, [table, id], (error, result) => {
      if (error) return reject(error);
      if (result.length === 0) return resolve(null);
      resolve(result[0]);
    });
  });
};

module.exports = checkExistence;
