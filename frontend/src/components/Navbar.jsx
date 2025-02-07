import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">StoreName</Link>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/checkout">Checkout</Link>
                    <Logout />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;