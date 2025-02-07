import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const  Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    console.log('product', product, 'id', id);

    useEffect(() => {
        // Simular la llamada a la API para obtener el producto por su ID
        const fetchProduct = async () => {
            try {
                console.log('product', product);
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                console.log('response', response);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product ? ( // Verificar si el producto ha sido cargado
                <>
                    <img src={product.imageUrl} alt={product.name} />
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </>
                ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
};

    
export default Product