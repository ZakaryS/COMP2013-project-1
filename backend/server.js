// Initialization
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const {DB_URI} = process.env;
const cors = require("cors");
const Product = require("./models/product");

// Middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());

// Database Connection and Server Listening
mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected.\nServer is listening on ${port}.`);
    });
}).catch((error) => console.log(error.message));

// Routes
server.get("/", (request, response) => {
    response.send("Server is Live!");
});

server.get("/products", async (request, response) => {
    try{
        const products = await Product.find();
        response.send(products);
    } catch(error) {
        response.status(500).send({message: error.message});
    }
});

server.get("/products/:_id", async (request, response) => {
    const { _id } = request.params;
    try {
        const productToEdit = await Product.findById(_id);
        response.send(productToEdit)
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

server.post("/products", async (request, response) => {
    const { id, productName, brand, image, price } = request.body;
    const newProduct = new Product({
        id,
        productName,
        brand,
        image,
        price,
    });
    try {
        await newProduct.save();
        response.status(200).send({message: "Product is added successfully!"});
    } catch(error) {
        response.status(400).send({message: error.message});
    }
})

server.delete("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
        await Product.findByIdAndDelete(id);
        response.send({ message: `Product is deleted with the id: ${id}` });
    } catch (error) {
        response.status(400).send({message: error.message});
    }
});

server.patch("/products/:_id", async (request, response) => {
    const { _id } = request.params;
    const { id, productName, brand, image, price } = request.body;
    try {
        await Product.findByIdAndUpdate( _id, {
            id,
            productName,
            brand,
            image,
            price,
        });
        response.send({ message: `Product has been updated with the id: ${_id}` });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});