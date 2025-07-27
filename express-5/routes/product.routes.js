const express = require("express");
const { Category } = require("../models/category");
const { Product, ProductValidator } = require("../models/product");

const api = express.Router();

api.get("/", async (req, res) => {
    let { page = 1, take = 3, year, price } = req.query
    let skip = (page - 1) * take
    let filter = {};

    if (year) filter.year = +year
    if (price) filter.price = +price

    try {
        let product = await Product.find(filter).skip(skip).limit(+take).populate("category");
        res.status(200).json({ data: product, message: "Product found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

api.get("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Product.findById(id).populate("category");
        if (!find) return res.status(404).json({ message: "Product not found", status: 404 });
        res.status(200).json({ data: find, message: "Product found successfuly", status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.post("/", async (req, res) => {
    try {
        let { value, error } = ProductValidator.validate(req.body);
        if (error) {
            return res.status(404).json({ message: error.details[0].message, status: 404 })
        }
        let newProduct = await new Product(value).populate("category")
        newProduct.save()
        res.status(201).json({ data: newProduct, message: "Product created successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.patch("/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body
    try {
        let find = await Product.findById(id).populate("category");
        if (!find) return res.status(404).json({ message: "Product not found", status: 404 });
        let updated = await Product.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json({ data: updated, message: "Product updated successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Product.findById(id).populate("category");
        if (!find) return res.status(404).json({ message: "Product not found", status: 404 });
        let deleted = await Product.findByIdAndDelete(id);
        res.status(201).json({ data: deleted, message: "Product deleted successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.get("/category/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Category.findById(id)
        if (!find) return res.status(404).json({ message: "Category not found", status: 404 });
        let data = await Product.find({ category: id }).populate("category")
        res.status(200).json({ data: data, message: "Product found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

module.exports = api;