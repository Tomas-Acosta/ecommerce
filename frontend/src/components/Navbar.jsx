import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">StoreName</Link>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/cart">Cart</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;