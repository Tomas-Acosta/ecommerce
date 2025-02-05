const jwt = require('jsonwebtoken');

const authMiddleware = (req,res, next) => {
    // Obtenemos el token desde los headers
    const token = req.headers['x-auth-token'];
    //Verificamos que el token exista
    if(!token){
        return res.status(401).json({ msg: 'No hay token, permiso no valido' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = decoded.id; // Almacenar el id del usuario en la petición
        next(); // Pasar al siguiente middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' });
    }
}

module.exports = authMiddleware;