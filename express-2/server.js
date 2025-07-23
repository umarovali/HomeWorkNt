const express = require("express");
const mongoose = require("mongoose");
const server = express();

mongoose.connect('mongodb://127.0.0.1:27017/home-1')
    .then((res) => console.log("connect db"))
    .catch((err) => console.log(err));

server.use(express.json());

const BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    author: String,
    year: Number
})

const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
})

const Book = mongoose.model("book", BookSchema);

const User = mongoose.model("user", UserSchema);

server.get("/books", async (req, res) => {
    let { page = 1, take = 5, price, author, year } = req.query
    let skip = (page - 1) * take
    let filter = {};

    if (price) filter.price = price;
    if (author) filter.author = author;
    if (year) filter.year = year;

    try {
        let book = await Book.find(filter).skip(skip).limit(+take);
        res.status(200).json({ data: book, message: "Successfully fetched books" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.get("/books/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let find = await Book.findById(id);
        if (!find) return res.status(404).json({ message: "Book not found!" });
        res.status(200).json({ data: find, message: "Successfully fetched book!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.post("/books", async (req, res) => {
    let body = req.body;
    let newBook = new Book(body);
    try {
        await newBook.save();
        res.status(201).json({ data: newBook, message: "Successfully created book!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.patch("/books/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;

    try {
        let find = await Book.findById(id);
        if (!find) return res.status(404).json({ message: "Book not found" });
        let updated = await Book.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({ data: updated, message: "Successfully updated book!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.delete("/books/:id", async (req, res) => {
    let { id } = req.params;

    try {
        let find = await Book.findById(id);
        if (!find) return res.status(404).json({ message: "Book not found" });
        let deleted = await Book.findByIdAndDelete(id);
        res.status(200).json({ data: deleted, message: "Successfully deleted book!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.get("/users", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({ data: users, message: "Successfully fetched users!" })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

server.get("/users/:id", async (req, res) => {
    let { id } = req.params
    try {
        let users = await User.findById(id);
        if (!users) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ data: users, message: "Successfully fetched users!" })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

server.patch("/users/:id", async (req, res) => {
    let { id } = req.params
    let body = req.bady

    try {
        let users = await User.findById(id);
        if (!users) return res.status(404).json({ message: "User not found" })
        let updated = await User.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({ data: updated, message: "Successfully updated user!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

server.delete("/users/:id", async (req, res) => {
    let { id } = req.params
    let body = req.bady

    try {
        let users = await User.findById(id);
        if (!users) return res.status(404).json({ message: "User not found" })
        let deleted = await User.findByIdAndDelete(id, body, { new: true })
        res.status(200).json({ data: deleted, message: "Successfully deleted user!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

server.post("/register", async (req, res) => {
    const body = req.body;

    try {
        const chekUser = await User.findOne({ email: body.email });

        if (chekUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const newUser = new User(body);
        await newUser.save();

        res.status(201).json({ data: newUser, message: "Successfully created user!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


server.post("/login", async (req, res) => {
    const { password, email } = req.body;

    try {
        const user = await User.find();

        let filter = user.find((ell) => ell.password === password && ell.email === email)

        if (!filter) {
            return res.status(400).json({ message: "Login or password is not correct" });
        }

        res.status(200).json({ data: filter, message: "Successfully created user!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

server.listen(3000, () => {
    console.log("Server run to 3000");
})