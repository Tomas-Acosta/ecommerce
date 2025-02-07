import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Bienvenido a la Tienda Online</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <Link to={`/products/${product.id}`}>Ver detalles</Link>
                        <button>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home