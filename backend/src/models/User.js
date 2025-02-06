const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,  // Usado para panel de administración
      },
}, { timestamps: true });

// Hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) { // Middleware para hashear la contraseña antes de guardar el usuario
    if (!this.isModified('password')) return next();// Si no se ha modificado la contraseña, pasar al siguiente middleware

    const salt = await bcrypt.genSalt(10); // Salt para encriptar la contraseña
    this.password = await bcrypt.hash(this.password, salt); // Encriptar la contraseña
    next(); // Pasar al siguiente middleware
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (enteredPassword) { // Metodo para comparar contraseñas
    return await bcrypt.compare(enteredPassword, this.password); // Comparar la contraseña ingresada con la encriptada en la base de datos
};

const User = mongoose.model('User', userSchema);

module.exports = User;