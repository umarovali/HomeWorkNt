const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const checkExistence = require("../helpers/checkExistence");
const { SECKRETKEY } = require("../config/config");
const { totp } = require("otplib");
const nodemailer = require("nodemailer");
totp.options = { step: 3 * 60 };

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "umarovali.345@gmail.com",
    pass: "blkc oedq qlxs duep",
  },
});

const SendOTP = (req, res) => {
  const { email } = req.body;
  const otp = totp.generate(email + "hi");

  emailTransporter.sendMail({
    from: "umarovali.345@gmail.com",
    to: email,
    subject: "Verification code",
    text: `You otp code ${otp}`,
  });

  res.json({ message: `Otp sended to ${email}` });
};

const VerifyOTP = (req, res) => {
  const { otp, email } = req.body;

  const isValid = totp.check(otp, email + "hi");
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const querySelect = "SELECT * FROM users WHERE email = ? LIMIT 1";
  db.query(querySelect, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    const queryUpdate = "UPDATE users SET is_active = ? WHERE email = ?";
    db.query(queryUpdate, [true, email], (err2) => {
      if (err2) return res.status(500).json({ message: "Error updating user" });

      return res.status(200).json({
        message: "OTP verified, You have successfully changed your status.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          is_active: true,
          address: user.address,
        },
      });
    });
  });
};

const Register = (req, res) => {
  const { name, phone_number, email, password, is_active, role, address } =
    req.body;

  const active = is_active !== undefined ? is_active : false;
  const userRole = role || "client";

  const hash = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (name, phone_number, email, password, is_active, role, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, phone_number, email, hash, active, userRole, address],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists" });
        }
        console.error(error);
        return res.status(500).json({ message: "Error adding user" });
      }

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: results.insertId,
          name,
          phone_number,
          email,
          is_active: active,
          role: userRole,
          address,
        },
        status: 201,
      });
    }
  );
};

const Login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? LIMIT 1";
  db.query(query, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: "Invalid password" });
    }

    let token = jwt.sign({ id: user.id }, SECKRETKEY);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  });
};

const GetAll = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: "Error retrieving Users" });
    res.json({
      statusCode: 200,
      message: "Users retАrieved successfully",
      data: result,
    });
  });
};

const GetOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await checkExistence("users", id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      statusCode: 200,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving User" });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "No data provided to update" });
  }

  try {
    const user = await checkExistence("users", id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating user" });

      res.json({
        statusCode: 200,
        message: "User updated successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await checkExistence("users", id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const query = `DELETE FROM users WHERE id = ?`;

    db.query(query, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error deleting user" });

      res.json({
        statusCode: 200,
        message: "User deleted successfully",
        affected: result.affectedRows,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  Register,
  Login,
  SendOTP,
  VerifyOTP,
  GetAll,
  GetOne,
  Update,
  Delete,
};
