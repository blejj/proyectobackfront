const express = require('express');
const cors = require('cors');
require('./config/db'); // Inicializa conexión a la BD

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const checkoutRoutes = require('./routes/checkout.routes');

const app = express();
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);
app.use('/api/checkout', checkoutRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

app.get('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send('¡Backend funcionando!');
});

// Iniciar servidor
app.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor escuchando en http://${HOSTNAME}:${PORT}`);
});

module.exports = app;
