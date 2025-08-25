const db = require("../config/db.config");
const checkExistence = require("../helpers/checkExistence");

const Create = (req, res) => {
  const { shop_id, tool_id, rent_price } = req.body;

  const query = `
      INSERT INTO shop_tool (shop_id, tool_id, rent_price) 
      VALUES (?, ?, ?)
    `;

  db.query(query, [shop_id, tool_id, rent_price], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error adding shop_tool" });
    }

    return res.status(201).json({
      message: "Tool created successfully",
      status: 201,
      id: results.insertId,
    });
  });
};

const GetAll = (req, res) => {
  const query = "SELECT * FROM shop_tool";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving Shop Tool" });
    res.json({
      statusCode: 200,
      message: "Shop Tool retarieved successfully",
      data: result,
    });
  });
};

const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const shop_tool = await checkExistence("shop_tool", id);

    if (!shop_tool) {
      return res.status(404).json({ message: "Shop Tool not found" });
    }

    res.json({
      statusCode: 200,
      message: "Shop Tool retrieved successfully",
      data: shop_tool,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Shop Tool" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const shop_tool = await checkExistence("shop_tool", id);
    if (!shop_tool) {
      return res.status(404).json({ message: "Shop Tool not found" });
    }

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const query = `UPDATE shop_tool SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating Shop Tool" });

      res.json({
        statusCode: 200,
        message: "Shop Tool updated successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating Shop Tool" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const shop_tool = await checkExistence("shop_tool", id);
    if (!shop_tool) {
      return res.status(404).json({ message: "Shop Tool not found" });
    }

    const query = `DELETE FROM shop_tool WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting Shop Tool" });

      res.json({
        statusCode: 200,
        message: "Shop Tool deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Shop Tool" });
  }
};

module.exports = { Create, GetAll, GetOne, Update, Delete };
