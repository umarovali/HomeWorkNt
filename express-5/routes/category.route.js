const express = require("express");
const { Category, CategroyValidator } = require("../models/category");

const api = express.Router();

api.get("/", async (req, res) => {
    try {
        let category = await Category.find();
        res.status(200).json({ data: category, message: "Category found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

api.get("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Category.findById(id);
        if (!find) return res.status(404).json({ message: "Category not found", status: 404 });
        res.status(200).json({ data: find, message: "Category found successfuly", status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.post("/", async (req, res) => {
    try {
        let { value, error } = CategroyValidator.validate(req.body);
        if (error) {
            return res.status(404).json({ message: error.details[0].message, status: 404 })
        }
        let newCategory = new Category(value)
        await newCategory.save()
        res.status(201).json({ data: newCategory, message: "Category created successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.patch("/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body
    try {
        let find = await Category.findById(id);
        if (!find) return res.status(404).json({ message: "Category not found", status: 404 });
        let updated = await Category.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json({ data: updated, message: "Category updated successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Category.findById(id);
        if (!find) return res.status(404).json({ message: "Category not found", status: 404 });
        let deleted = await Category.findByIdAndDelete(id);
        res.status(200).json({ data: deleted, message: "Category deleted successfuly", status: 200 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

module.exports = api;