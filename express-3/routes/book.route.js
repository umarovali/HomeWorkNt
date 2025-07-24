const express = require("express");
const { Book } = require("../models/book");
const { Author } = require("../models/author");

const api = express.Router();

api.get("/", async (req, res) => {
    let { page = 1, take = 3, year, price } = req.query
    let skip = (page - 1) * take
    let filter = {};

    if (year) filter.year = +year
    if (price) filter.price = +price

    try {
        let book = await Book.find(filter).skip(skip).limit(+take).populate("author");
        res.status(200).json({ data: book, message: "Book found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

api.get("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Book.findById(id).populate("author");
        if (!find) return res.status(404).json({ message: "Book not found", status: 404 });
        res.status(200).json({ data: find, message: "Book found successfuly", status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.post("/", async (req, res) => {
    let body = req.body
    try {
        let newBook = await new Book(body).populate("author")
        newBook.save()
        res.status(201).json({ data: newBook, message: "Book created successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.patch("/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body
    try {
        let find = await Book.findById(id).populate("author");
        if (!find) return res.status(404).json({ message: "Book not found", status: 404 });
        let updated = await Book.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json({ data: updated, message: "Book updated successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Book.findById(id).populate("author");
        if (!find) return res.status(404).json({ message: "Book not found", status: 404 });
        let deleted = await Book.findByIdAndDelete(id);
        res.status(201).json({ data: deleted, message: "Book deleted successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.get("/author/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Author.findById(id)
        if (!find) return res.status(404).json({ message: "Author not found", status: 404 });
        let data = await Book.find({ author: id }).populate("author")
        res.status(200).json({ data: data, message: "Book found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

module.exports = api;