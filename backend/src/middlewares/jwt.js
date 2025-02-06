const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });// Generar el token JWT con el ID del usuario, la clave secreta y la duración del token 
}

module.exports = generateToken