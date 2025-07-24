const express = require("express");
const { Author } = require("../models/author");

const api = express.Router();

api.get("/", async (req, res) => {
    try {
        let author = await Author.find();
        res.status(200).json({ data: author, message: "Author found successfuly", status: 200 });
    } catch (err) {
        res.status(404).json({ message: err.message, status: 404 })
    }
})

api.get("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Author.findById(id);
        if (!find) return res.status(404).json({ message: "Author not found", status: 404 });
        res.status(200).json({ data: find, message: "Author found successfuly", status: 200 });
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.post("/", async (req, res) => {
    let body = req.body
    try {
        let newAuthor = await new Author(body)
        newAuthor.save()
        res.status(201).json({ data: newAuthor, message: "Author created successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.patch("/:id", async (req, res) => {
    let { id } = req.params
    let body = req.body
    try {
        let find = await Author.findById(id);
        if (!find) return res.status(404).json({ message: "Author not found", status: 404 });
        let updated = await Author.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json({ data: updated, message: "Author updated successfuly", status: 201 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

api.delete("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let find = await Author.findById(id);
        if (!find) return res.status(404).json({ message: "Author not found", status: 404 });
        let deleted = await Author.findByIdAndDelete(id);
        res.status(200).json({ data: deleted, message: "Author deleted successfuly", status: 200 })
    } catch (err) {
        res.status(400).json({ message: err.message, status: 400 })
    }
})

module.exports = api;