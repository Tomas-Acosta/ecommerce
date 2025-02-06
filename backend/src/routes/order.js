const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// Ruta para crear un nuevo pedido a partir del carrito
router.post('/', authMiddleware, async (req, res) => {
    const { userId } = req.body;

    try {
        // Buscar el carrito del usuario
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Calcular el precio total del pedido
        const totalPrice = cart.products.reduce((total, product) => total + product.productId.price * product.quantity, 0);

        // Crear el nuevo pedido
        const newOrder = new Order({
            userId,
            products: cart.products.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            totalPrice
        });

        // Guardar el pedido en la base de datos
        await newOrder.save();

        // Limpiar el carrito del usuario
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: 'Pedido creado correctamente', newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
});

// Ruta para obtener todos los pedidos de un usuario
router.get('/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('products.productId');
        if (!orders) {
            return res.status(404).json({ message: 'Pedidos no encontrados' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
});

// Actualizar el estado de un pedido
router.put('/:orderId', authMiddleware, async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Pedido actualizado correctamente', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pedido', error });
    }
});

// Eliminar un pedido
router.delete('/:orderId', authMiddleware, async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json({ message: 'Pedido eliminado correctamente', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
});

module.exports = router;