const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Ruta para agregar un producto al carrito
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            productIndex !== -1 ? cart.products[productIndex].quantity += quantity : cart.products.push({ productId, quantity });
        }
        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito correctamente', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
});


// Ruta para obtener el carrito de un usuario
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json({ message: 'Carrito obtenido correctamente', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
});

// Ruta para eliminar un producto del carrito
router.delete('/:userId/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        //Eliminar el producto del carrito
        cart.products = cart.products.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ message: 'Producto eliminado del carrito correctamente', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
});

module.exports = router;