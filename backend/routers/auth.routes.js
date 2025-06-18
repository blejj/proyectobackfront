const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { poolPromise, sql } = require('../routers/db'); // ruta según dónde esté tu archivo

const router = express.Router();

// REGISTRO
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email y contraseña requeridos' });

  try {
    const pool = await poolPromise;

    const existe = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Usuarios WHERE email = @email');

    if (existe.recordset.length > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO Usuarios (email, password) VALUES (@email, @password)');

    res.status(201).json({ message: 'Usuario registrado con éxito' });

  } catch (err) {
    console.error('❌ Error al registrar:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Usuarios WHERE email = @email');

    const user = result.recordset[0];

    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = jwt.sign({ email: user.email }, 'secreto123', { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
