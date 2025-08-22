const db = require("../config/db.config");

// Create
const createGasStationBranch = (req, res) => {
  const { gas_station_id, name, address, location, phone_number } = req.body;
  const query = `
    INSERT INTO gas_station_branch (gas_station_id, name, address, location, phone_number) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [gas_station_id, name, address, location, phone_number],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error adding Gas Station Branch" });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Gas Station Branch added",
        id: results.insertId,
      });
    }
  );
};

// Get all
const getGasStationBranches = (req, res) => {
  db.query(`SELECT * FROM gas_station_branch`, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving Gas Station Branches" });
    }
    res.json({
      statusCode: 200,
      message: "Gas Station Branches retrieved successfully",
      data: result,
    });
  });
};

const findByFilter = (req, res) => {
  const { name, address, phone_number } = req.query;

  let where = "true";

  if (name) {
    where += ` and name LIKE '%${name}%'`;
  }

  if (address) {
    where += ` and address LIKE '%${address}%'`;
  }

  if (phone_number) {
    where += ` and phone_number LIKE '%${phone_number}%'`;
  }

  if (where == "true") {
    return res.status(400).json({
      message: "Qidiruv oarametirni kiriting",
    });
  }

  const getQuery = `SELECT * FROM gas_station_branch WHERE ${where}`;

  db.query(getQuery, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error getting Fuel Types",
        error: "Internal Server Error",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Fuel types retrieved successfully",
      data: result,
    });
  });
};

// Get one
const getOneGasStationBranch = (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT * FROM gas_station_branch WHERE id = ?`,
    [id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error retrieving Gas Station Branch" });
      if (!result.length)
        return res
          .status(404)
          .json({ message: "Gas Station Branch not found" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch retrieved successfully",
        data: result[0],
      });
    }
  );
};

// Update
const updateGasStationBranch = (req, res) => {
  const { id } = req.params;
  const { gas_station_id, name, address, location, phone_number } = req.body;
  const query = `
    UPDATE gas_station_branch SET gas_station_id=?, name=?, address=?, location=?, phone_number=? WHERE id=?
  `;
  db.query(
    query,
    [gas_station_id, name, address, location, phone_number, id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error updating Gas Station Branch" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch updated successfully",
        affected: result.affectedRows,
      });
    }
  );
};

// Delete
const deleteGasStationBranch = (req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE FROM gas_station_branch WHERE id = ?`,
    [id],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error deleting Gas Station Branch" });
      res.json({
        statusCode: 200,
        message: "Gas Station Branch deleted successfully",
        affected: result.affectedRows,
      });
    }
  );
};

module.exports = {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
  findByFilter,
};
