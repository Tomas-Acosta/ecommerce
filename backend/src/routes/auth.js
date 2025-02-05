const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Obtener los datos del cuerpo de la solicitud POST
    
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
        const salt = await bcrypt.genSalt(10); // Salt para encriptar la contraseña
        const hashPassword = await bcrypt.hash(password, salt); // Encriptar la contraseña
        const newUser = new User({ name, email, password: hashPassword });  // Crear el nuevo usuario
        await newUser.save(); // Guardar el nuevo usuario en la base de datos

        //Crear un token JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generar el token

        res.status(201).json({ message: 'Usuario registrado correctamente', token });
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
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña es incorrecta' });
        }

        //Crear un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generar el token

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {    
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

module.exports = router;