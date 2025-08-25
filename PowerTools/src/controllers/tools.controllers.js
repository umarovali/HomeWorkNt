const db = require("../config/db.config");
const checkExistence = require("../helpers/checkExistence");

const Create = (req, res) => {
  const { name, brand, description, tool_price } = req.body;

  const query = `
      INSERT INTO tool (name, brand , description, tool_price) 
      VALUES (?, ?, ?, ?)
    `;

  db.query(query, [name, brand, description, tool_price], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error adding tool" });
    }

    return res.status(201).json({
      message: "Tool created successfully",
      status: 201,
      id: results.insertId,
    });
  });
};

const GetAll = (req, res) => {
  const query = "SELECT * FROM tool";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving Tool" });
    res.json({
      statusCode: 200,
      message: "Tool retarieved successfully",
      data: result,
    });
  });
};

const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const tool = await checkExistence("tool", id);

    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    res.json({
      statusCode: 200,
      message: "Tool retrieved successfully",
      data: tool,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Tool" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const tool = await checkExistence("tool", id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const query = `UPDATE tool SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating tool" });

      res.json({
        statusCode: 200,
        message: "Tool updated successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating tool" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const tool = await checkExistence("tool", id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    const query = `DELETE FROM tool WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting tool" });

      res.json({
        statusCode: 200,
        message: "Tool deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tool" });
  }
};

module.exports = { Create, GetAll, GetOne, Update, Delete };
