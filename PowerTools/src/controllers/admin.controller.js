const db = require("../config/db.config");

const createAdmin = (req, res) => {
  const { full_name, email, password, phone_number, is_active, is_creator } =
    req.body;
  db.query(
    `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES (?, ?, ?, ?, ?, ?)`,
    [full_name, email, password, phone_number, is_active, is_creator],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: "Error adding new Admin ",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New Admin  added",
        id: results.insertId,
      });
    }
  );
};

const getAdmin = (req, res) => {
  const getQuery = `SELECT * FROM admin`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  Admin s",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Admin s retrieved successfully",
      data: result,
    });
  });
};

const getOneAdmin = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM admin WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one Admin ",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Admin retrieved successfully",
      data: result[0],
    });
  });
};

const updateAdmin = (req, res) => {
  const id = req.params.id;
  const { full_name, email, password, phone_number, is_active, is_creator } =
    req.body;

  const updateQuery = `UPDATE admin SET full_name = ?, email = ?, password = ?, phone_number = ?, is_active = ?, is_creator = ? WHERE id = ?`;

  db.query(
    updateQuery,
    [full_name, email, password, phone_number, is_active, is_creator, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error updating one Admin ",
          error: "Internal Server Error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "a Admin updated successfully" });
    }
  );
};

const deleteAdmin = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM admin where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one Admin",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "a Admin deleted successfully" });
  });
};

module.exports = {
  createAdmin,
  getAdmin,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
};
