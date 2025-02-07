import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import PrivateRoutes from './components/PrivateRoute';

import './App.css'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} component={() => <h2>Bienvenido a la Tienda Online</h2>} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path="/checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
          <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
