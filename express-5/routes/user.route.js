const express = require("express");
const { User, UserValidator } = require("../models/user");

const api = express();

api.post("/register", async (req, res) => {
    try {
        const { value, error } = UserValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message, status: 400 });
        }

        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists", status: 409 });
        }

        const newUser = new User(value);
        await newUser.save();

        res.status(201).json({ data: newUser, message: "User registered successfully", status: 201 });
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500 });
    }
});

api.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", status: 400 });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email not found", status: 404 });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password", status: 401 });
        }

        res.status(200).json({ data: user, message: "Login successful", status: 200 });

    } catch (err) {
        res.status(500).json({ message: err.message, status: 500 });
    }
});


api.get("/", async (req, res) => {
    try {
        let user = await User.find();
        res.status(200).json({ data: user, message: "User found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

api.patch("/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body
    try {
        let find = await User.findById(id);
        if (!find) return res.status(404).json({ message: "User not found", status: 404 });
        let updated = await User.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json({ data: updated, message: "User updated successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await User.findById(id)
        if (!find) return res.status(404).json({ message: "User not found", status: 404 });
        let deleted = await User.findByIdAndDelete(id);
        res.status(204).json({ data: deleted, message: "User deleted successfuly", status: 204 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})


module.exports = api;
