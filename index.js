const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.models.js');
const app = express();

app.use(express.json());

// ----------get api---------------
app.get('/api/products', async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/api/product/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// ------------post api---------------------
app.post('/api/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// ------------update api---------------------
app.put('/api/product/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(updatedProduct);
    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// ------------delete api---------------------
app.delete('/api/product/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb://dbUser:dbUserPassword@ac-1igahsa-shard-00-00.zrwmmfx.mongodb.net:27017,ac-1igahsa-shard-00-01.zrwmmfx.mongodb.net:27017,ac-1igahsa-shard-00-02.zrwmmfx.mongodb.net:27017/Node-Mongo?ssl=true&replicaSet=atlas-r776em-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
        console.log('Connected!')
        app.listen(5000, () => {
            console.log("Server Started at 5000");
        });
    })
    .catch(() => {
        console.log('Connection failed!')
    });
