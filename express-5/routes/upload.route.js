const multer = require("multer");
const express = require("express");
const path = require("path");

const api = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

api.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File not found!", status: 400 });
    }

    res.status(201).json({ file: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`, status: 201 })
});

module.exports = api;