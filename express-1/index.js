const express = require("express");
const fs = require("fs");
const { join } = require("path");

const app = express();
app.use(express.json());

let products = fs.readFileSync(join(__dirname, "database", "products.json"));
products = JSON.parse(products)
let users = fs.readFileSync(join(__dirname, "database", "users.json"));
users = JSON.parse(users)

// products?page=1&take=2&produced=dubay&price=600 :example

app.get("/products", (req, res) => {
    let { page = 1, take = 10, produced, price } = req.query;

    let filtered = products;

    if (produced) {
        filtered = filtered.filter(product => product.produced.toLowerCase() === produced.toLowerCase());
    }

    if (price) {
        filtered = filtered.filter(product => product.price === +price);
    }

    let start = (+page - 1) * +take;
    let finish = start + +take;

    res.status(200).send({
        products: filtered.slice(start, finish),
        message: "Successfully!"
    });
});


app.post("/products", (req, res) => {
    const body = req.body;
    const chekId = products[products.length - 1]?.id ? products[products.length - 1]?.id + 1 : 1

    const newProduct = { id: chekId, ...body }

    products.push(newProduct);

    fs.writeFileSync(
        join(__dirname, "database", "products.json"),
        JSON.stringify(products)
    )

    res.status(201).send({ product: newProduct, message: "Successfully created product!" })
})

app.patch("/products/:id", (req, res) => {
    let { id } = req.params;

    let index = products.findIndex(i => i.id === +id);


    if (index === -1) {
        res.status(404).send("This product does not exist!")
        return
    }

    products[index] = { id: products[index].id, ...req.body }

    fs.writeFileSync(
        join(__dirname, "database", "products.json"),
        JSON.stringify(products)
    )

    res.status(201).send({ product: { id: products[index].id, ...req.body }, message: "Successfully updated product!" })
})

app.delete("/products/:id", (req, res) => {
    let { id } = req.params

    let index = products.findIndex(i => i.id === +id);

    if (index === -1) {
        res.status(404).send("This product does not exist!")
        return
    }

    products.splice(index, 1)

    fs.writeFileSync(
        join(__dirname, "database", "products.json"),
        JSON.stringify(products)
    )

    res.status(201).send({ message: "Successfully deleted product!" })
})

app.post("/register", (req, res) => {
    const body = req.body
    const chekId = users[users.length - 1]?.id ? users[users.length - 1]?.id + 1 : 1

    const newUsers = { id: chekId, ...body }

    users.push(newUsers)

    fs.writeFileSync(
        join(__dirname, "database", "users.json"),
        JSON.stringify(users)
    )
    res.status(201).send({ user: newUsers, message: "Successfully created user!" })
})

app.post("/login", (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send({ message: "name and password are required!" });
    }

    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
        return res.status(401).send({ message: "Incorrect name or password!" });
    }

    res.status(200).send({ user, message: "Successfully logged in!" });
});


const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});