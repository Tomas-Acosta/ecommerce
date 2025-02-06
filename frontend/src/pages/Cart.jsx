import React from 'react';

const  Cart = () => {
    const cartItems = [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
        { id: 3, name: 'Item 3', price: 30 },
    ];

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h1>Carrito</h1>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
            <p>Total: ${totalPrice}</p>
            <button>PAGAR</button>
        </div>
    )
}

export default Cart;