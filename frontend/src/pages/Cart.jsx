import React, { useEffect } from 'react';
import axiosInstance from '../utils/axios';

const  Cart = () => {
    const [cartItems, setCartItems] = React.useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                //Obtener el id del usuario para obtener el carrito
                const { data: userData } = await axiosInstance.get('/api/auth/profile');
                const userId = userData.user._id;
                if (!userId) {
                    throw new Error('No se pudo obtener el ID del usuario');
                }
                const { data: cartData } = await axiosInstance.get(`/api/cart/${userId}`); // Ruta de la API para obtener el carrito
                console.log('cartData', cartData);
                const cartItems = cartData.cart.products.map(product => ({ id: product.productId._id, name: product.productId.name, price: product.productId.price }));
                console.log('cartItems', cartItems);
                setCartItems(cartItems);
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            }
        }

        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    const handleRemoveFromCart = async (productId) => {
        try {
            const { data: userData } = await axiosInstance.get('/api/auth/profile'); // Ruta de la API para obtener el perfil del usuario
            const userId = userData.user._id; // Obtener el ID del usuario
            await axiosInstance.delete(`/api/cart/${userId}/${productId}`, { // Ruta de la API para eliminar el producto del carrito
                productId,
                userId
            });
            console.log('Producto eliminado del carrito:', productId);
            setCartItems(cartItems.filter(item => item.id !== productId));// Actualizar el carrito después de eliminar el producto
        } catch (error) {
            console.error('Error en la solicitud de eliminar del carrito:', error);
        }
    };

    return (
        <div>
            <h1>Carrito</h1>
            {cartItems.length === 0 ? (
                <p>El carrito esta vacio.</p>
            ):(<ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            )}
            <p>Total: ${totalPrice}</p>
            <button>PAGAR</button>
        </div>
    )
}

export default Cart;