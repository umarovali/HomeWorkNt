const db = require("../config/db.config");
const checkExistence = require("../helpers/checkExistence");

const Create = (req, res) => {
  const { client_id, shop_tool_id, period } = req.body;

  const checkUser = `SELECT id FROM users WHERE id = ? AND role = 'client'`;

  db.query(checkUser, [client_id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid client_id: user is not a client" });
    }

    const checkTool = `SELECT id FROM shop_tool WHERE id = ?`;

    db.query(checkTool, [shop_tool_id], (error, toolResult) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error checking shop_tool" });
      }

      if (toolResult.length === 0) {
        return res.status(400).json({ message: "Invalid shop_tool_id" });
      }

      const query = `
        INSERT INTO orders (client_id, shop_tool_id, period)
        VALUES (?, ?, ?)
      `;

      db.query(query, [client_id, shop_tool_id, period], (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Error adding order" });
        }

        return res.status(201).json({
          message: "Order created successfully",
          status: 201,
          id: results.insertId,
        });
      });
    });
  });
};


const GetAll = (req, res) => {
  const query = "SELECT * FROM orders";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving orders" });
    res.json({
      statusCode: 200,
      message: "Orders retarieved successfully",
      data: result,
    });
  });
};


const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await checkExistence("orders", id);

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.json({
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving orders" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const orders = await checkExistence("orders", id);
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const query = `UPDATE orders SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating orders" });

      res.json({
        statusCode: 200,
        message: "Orders updated successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating orders" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await checkExistence("orders", id);
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    const query = `DELETE FROM orders WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting orders" });

      res.json({
        statusCode: 200,
        message: "Orders deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting orders" });
  }
};


module.exports = { Create, GetAll, GetOne, Update, Delete };

