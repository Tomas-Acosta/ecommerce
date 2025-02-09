import React, { useEffect, useState} from 'react'
import { use } from 'react';
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axios';

const Home = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
        useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axiosInstance.get('/api/products');
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const { data: userData  } = await axiosInstance.get('/api/auth/profile'); // Ruta de la API para obtener el perfil del usuario
            const userId = userData.user._id; // Obtener el ID del usuario

            if (!userId) {
                throw new Error('No se pudo obtener el ID del usuario');
            }
            const {data: response} = await axiosInstance.post('/api/cart', { 
                userId,
                productId,
                quantity: 1
             }); // Ruta de la API para agregar el producto al carrito
        } catch (error) {
            console.error('Error en la solicitud de agregar al carrito:', error);
        }
    }


    return (
        <div>
            <h1>Bienvenido a la Tienda Online</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <Link to={`/products/${product._id}`}>Ver detalles</Link>
                        <button onClick={() => handleAddToCart(product._id)}>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home