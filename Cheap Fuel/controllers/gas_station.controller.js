const db = require("../config/db.config");

// Create
const createGasStation = (req, res) => {
  const { name } = req.body;
  db.query(
    `INSERT INTO gas_station (name) VALUES (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Error adding new Gas Station" });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New Gas Station added",
        id: results.insertId,
      });
    }
  );
};

// Get all
const getGasStations = (req, res) => {
  db.query(`SELECT * FROM gas_station`, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error retrieving Gas Stations" });
    res.json({
      statusCode: 200,
      message: "Gas Stations retrieved successfully",
      data: result,
    });
  });
};

const getSearch = (req, res) => {
  const { name } = req.params;

  const getQuery = `SELECT gsb.name, gsb.address FROM gas_station_branch gsb
    LEFT JOIN gas_station gs ON gs.id=gsb.gas_station_id
    WHERE gs.name LIKE ?
    `;

  db.query(getQuery, [`%${name}%`], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error retrieving Gas Stations" });
    res.json({
      statusCode: 200,
      message: "Gas Stations retrieved successfully",
      data: result,
    });
  });
};

// Get one
const getOneGasStation = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM gas_station WHERE id = ?`, [id], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error retrieving Gas Station" });
    if (!result.length)
      return res.status(404).json({ message: "Gas Station not found" });
    res.json({
      statusCode: 200,
      message: "Gas Station retrieved successfully",
      data: result[0],
    });
  });
};

// Update
const updateGasStation = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query(
    `UPDATE gas_station SET name = ? WHERE id = ?`,
    [name, id],
    (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating Gas Station" });
      res.json({
        statusCode: 200,
        message: "Gas Station updated successfully",
        affected: result.affectedRows,
      });
    }
  );
};

// Delete
const deleteGasStation = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM gas_station WHERE id = ?`, [id], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error deleting Gas Station" });
    res.json({
      statusCode: 200,
      message: "Gas Station deleted successfully",
      affected: result.affectedRows,
    });
  });
};

module.exports = {
  createGasStation,
  getGasStations,
  getOneGasStation,
  updateGasStation,
  getSearch,
  deleteGasStation,
};
