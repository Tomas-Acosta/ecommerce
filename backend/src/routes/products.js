const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl, stock } = req.body;

    try {
        const newProduct = new Product({ name, description, price, category, imageUrl, stock });
        await newProduct.save();
        res.status(201).json({ message: 'Producto creado correctamente', newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});

// Ruta para obtener un producto por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, imageUrl, stock }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado correctamente', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }    
});

module.exports = router;