import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const products = [
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
        { id: 3, name: 'Producto 3', price: 30 },
    ];


    return (
        <div>
            <h1>Bienvenido a la Tienda Online</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                        <Link to={`/product/${product.id}`}>Ver detalles</Link>
                    </div>
                ))}

                {/* Aqui va un carrusel de productos destacados*/}

                {/* Aqui va un carrusel de categorias*/}

                {/* Aqui va un carrusel de marcas*/}


            </div>
        </div>
    )
}

export default Home