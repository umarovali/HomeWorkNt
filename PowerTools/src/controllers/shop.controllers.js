const db = require("../config/db.config");
const checkExistence = require("../helpers/checkExistence");

const Create = (req, res) => {
  const { name, owner_id, district_id, phone_number, address, location } =
    req.body;

  const check = `SELECT id FROM users WHERE id = ? AND role = 'owner'`;

  db.query(check, [owner_id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid owner_id: user is not an owner" });
    }

    const query = `
      INSERT INTO shop (name, owner_id, district_id, phone_number, address, location) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [name, owner_id, district_id, phone_number, address, location],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Error adding shop" });
        }

        return res.status(201).json({
          message: "Shop created successfully",
          status: 201,
          id: results.insertId,
        });
      }
    );
  });
};

const GetAll = (req, res) => {
  const query = "SELECT * FROM shop";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving shop" });
    res.json({
      statusCode: 200,
      message: "Shop retarieved successfully",
      data: result,
    });
  });
};

const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await checkExistence("shop", id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json({
      statusCode: 200,
      message: "Shop retrieved successfully",
      data: shop,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Shop" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const shop = await checkExistence("shop", id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const query = `UPDATE shop SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating shop" });

      res.json({
        statusCode: 200,
        message: "Shop updated successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating shop" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await checkExistence("shop", id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const query = `DELETE FROM shop WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting shop" });

      res.json({
        statusCode: 200,
        message: "Shop deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting shop" });
  }
};

module.exports = { Create, GetAll, GetOne, Update, Delete };
