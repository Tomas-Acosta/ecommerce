const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const generateToken = require('../middlewares/jwt');

// Ruta protegida (requiere autenticación)
router.get("/profile", authMiddleware, async (req, res) => {
    try {
      // Buscar al usuario por su ID (req.user contiene el userId decodificado)
      const user = await User.findById(req.user).select("-password");  // No devolver la contraseña      
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" , user});
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el perfil del usuario", error });
    }
  });

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Obtener los datos del cuerpo de la solicitud POST
    console.log(name, email, password);
    // Validar que todos los campos sean obligatorios
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario existe
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        //Crear un nuevo usuario
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});

// Iniciar sesion de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el usuario por correo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        console.log('user.password',user.password, 'password',password);
        // Verificar la contraseña
        const isMatch = await user.comparePassword(password);
        console.log('isMatch',isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña es incorrecta' });
        }
        //Crear un token JWT
        const token = generateToken(user._id); // Generar el token

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {    
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

module.exports = router;