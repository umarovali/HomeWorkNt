const db = require("../config/db.config");

// Create
const createFuelType = (req, res) => {
  const { name } = req.body;
  db.query(
    `INSERT INTO fuel_types (name) VALUES (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log(error);

        console.log("Yangi yoqilgi turini qushishda xatolik");

        return res.status(500).json({
          message: "Error adding new Fuel Type",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New Fuel Type added",
        id: results.insertId,
      });
    }
  );
};

// Get all
const getFuelType = (req, res) => {
  const getQuery = `SELECT * FROM fuel_types`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  Fuel Types",
        error: "Internal Server Error",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "fuel types retrieved successfully",
      data: result,
    });
  });
};

const findByName = (req, res) => {
  const { name } = req.query;

  const getQuery = `SELECT * FROM fuel_types WHERE name LIKE ?`;

  db.query(getQuery, [`%${name}%`], (error, result) => {
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

const search = (req, res) => {
  const { name } = req.params;

  const getQuery = `SELECT gsb.name, ft.name 
FROM
    gas_station_fuel_type gsft
    LEFT JOIN fuel_types ft ON ft.id = gsft.fuel_type_id
    LEFT JOIN gas_station_branch gsb ON gsft.gas_station_branch_id = gsb.id
WHERE
    gsft.is_exists = 1
    AND ft.name LIKE ?`;

  db.query(getQuery, [`%${name}%`], (error, result) => {
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

const searchMin = (req, res) => {
  const { name } = req.params;

  const getQuery = `SELECT gsb.name, ft.name as name_benzin, gsft.price 
FROM
    gas_station_fuel_type gsft
    LEFT JOIN fuel_types ft ON ft.id = gsft.fuel_type_id
    LEFT JOIN gas_station_branch gsb ON gsft.gas_station_branch_id = gsb.id
WHERE
    gsft.is_exists = 1
    AND ft.name LIKE "%95%" ORDER BY gsft.price LIMIT 1`;

  db.query(getQuery, [`%${name}%`], (error, result) => {
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
const getOneFuelType = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM fuel_types WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one Fuel Type",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A fuel not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a fuel type retrieved successfully",
      data: result[0],
    });
  });
};

// Update
const updateFuelType = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const updateQuery = `UPDATE fuel_types SET name = ? WHERE id = ?`;

  db.query(updateQuery, [name, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating one Fuel Type",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a fuel type updated successfully",
      data: result.affectedRows,
    });
  });
};

// Delete
const deleteFuelType = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM fuel_types where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one Fuel Type",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a fuel type deleted successfully",
      data: result.affectedRows,
    });
  });
};

module.exports = {
  createFuelType,
  getFuelType,
  findByName,
  getOneFuelType,
  updateFuelType,
  deleteFuelType,
  search,
  searchMin,
};
