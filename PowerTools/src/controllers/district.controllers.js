const db = require("../config/db.config");
const checkExistence = require("../helpers/checkExistence");

const Create = (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO district (name) VALUES (?)`;

  db.query(query, [name], (error, results) => {
    if (error) {
      console.log(error);

      return res.status(500).json({ message: "Error adding district" });
    }

    return res.status(201).json({
      message: "District created successfully",
      status: 201,
      id: results.insertId,
    });
  });
};

const GetAll = (req, res) => {
  const query = "SELECT * FROM district";

  db.query(query, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error retrieving District" });
    res.json({
      statusCode: 200,
      message: "District retАrieved successfully",
      data: result,
    });
  });
};

const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const district = await checkExistence("district", id);

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.json({
      statusCode: 200,
      message: "District retrieved successfully",
      data: district,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving District" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const exists = await checkExistence("district", id);

    if (!exists) {
      return res.status(404).json({ message: "District not found" });
    }

    const updateQuery = "UPDATE district SET name = ? WHERE id = ?";
    db.query(updateQuery, [name, id], (error, updateResult) => {
      if (error) {
        return res.status(500).json({ message: "Error updating district" });
      }

      res.json({
        statusCode: 200,
        message: "District updated successfully",
        affected: updateResult.affectedRows,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await checkExistence("district", id);
    if (!user) {
      return res.status(404).json({ message: "District not found" });
    }

    const query = `DELETE FROM district WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting District" });

      res.json({
        statusCode: 200,
        message: "District deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting District" });
  }
};

module.exports = { Create, GetAll, GetOne, Update, Delete };
