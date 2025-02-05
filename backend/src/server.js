const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cart');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear una instancia de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON en las peticiones

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Puerto donde el servidor escuchará
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
