const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category || !imageUrl || !stock) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const newProduct = new Product({ name, description, price, category, imageUrl, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

module.exports = router;