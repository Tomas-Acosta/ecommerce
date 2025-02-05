const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{ // Conectar a la base de datos
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`); // Mostrar mensaje de conexión exitosa
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`); // Mostrar mensaje de error
        process.exit(1); // Salir del proceso con un código de error
    }
};

module.exports = connectDB;