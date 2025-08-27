const db = require("../config/db.config");

const findShop_by_tool_name = (req, res) => {
  const { tool_name } = req.body;
  db.query(
    `SELECT sh.name, sh.address, shl.rent_price FROM shop_tool shl 
LEFT JOIN tool t ON shl.tool_id = t.id
LEFT JOIN shop sh on shl.shop_id=sh.id
WHERE t.name = (?)`,
    [tool_name],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: error.message,
          error: "Internal Server Error",
        });
      }

      if (!results.length) {
        return res.status(200).json({
          statusCode: 200,
          message: `${tool_name} - no such tool found.`,
          data: results,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: `found stores that have a ${tool_name}`,
        data: results,
      });
    }
  );
};

const findUsers_by_max_rent_price = (req, res) => {
  const { rent_price } = req.body;
  db.query(
    `SELECT u.name, u.phone_number, u.id, shl.rent_price, t.name as tool
FROM
    orders o
    LEFT JOIN shop_tool shl on o.shop_tool_id = shl.id
    LEFT JOIN user u ON u.id = o.client_id
    LEFT JOIN tool t ON t.id=shl.tool_id
WHERE
    shl.rent_price < (?)`,
    [rent_price],
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: error.message,
          error: "Internal Server Error",
        });
      }

      if (!results.length) {
        return res.status(200).json({
          statusCode: 200,
          message: `${rent_price} - such rental price not found in tools.`,
          data: results,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: `this rental price was found in tools`,
        data: results,
      });
    }
  );
};

const findUsers_by_district_by_date_by_tool = (req, res) => {
  const { district_name, start_date, end_date, tool_name } = req.body;
  let querySelect = "u.name as user_name, u.phone_number";
  let queryWhere = "true";

  if (district_name) {
    querySelect += ", d.name as district";
    queryWhere += ` AND d.name LIKE '%${district_name}%'`;
  }

  if (tool_name) {
    querySelect += ", t.name as tool_name";
    queryWhere += ` AND t.name LIKE '%${tool_name}%'`;
  }

  if (start_date && end_date) {
    querySelect += ", o.order_date";
    queryWhere += ` AND (
        o.order_date BETWEEN '${start_date}' AND '${end_date}'
    )`;
  } else {
    return res.status(400).json({
      message: "start_date or end_date missing",
    });
  }

  db.query(
    `SELECT ${querySelect}
FROM
    user u
    LEFT JOIN orders o ON u.id = o.client_id
    LEFT JOIN shop_tool shl ON shl.id = o.shop_tool_id
    LEFT JOIN tool t ON shl.tool_id = t.id
    LEFT JOIN shop sh ON sh.id = shl.shop_id
    LEFT JOIN district d ON d.id = sh.district_id
WHERE
    ${queryWhere}
    `,
    (error, results) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          message: error.message,
          error: "Internal Server Error",
        });
      }

      if (!results.length) {
        return res.status(200).json({
          statusCode: 200,
          message: `User not found, statuscode tipo 204.`,
          data: results,
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: `OK`,
        data: results,
      });
    }
  );
};

module.exports = {
  findShop_by_tool_name,
  findUsers_by_max_rent_price,
  findUsers_by_district_by_date_by_tool,
};
