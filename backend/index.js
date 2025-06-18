const express = require('express');
const cors = require('cors');
require('./routers/db'); // Solo para inicializar la conexión

const authRoutes = require('./routers/auth.routes');

const app = express();
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

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
