const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    let token;
    console.log(token);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'No autorizado, token inválido' });
        }
    } else {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = authMiddleware;