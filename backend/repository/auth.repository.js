const { poolPromise, sql } = require('../config/db');

const getUserByEmail = async (email) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT * FROM Usuarios WHERE email = @email');

  return result.recordset[0];
};

const insertUser = async ({ email, password, nombre, apellido, telefono, direccion, dni }) => {
  const pool = await poolPromise;
  await pool.request()
    .input('email', sql.VarChar, email)
    .input('password', sql.VarChar, password)
    .input('nombre', sql.VarChar, nombre)
    .input('apellido', sql.VarChar, apellido)
    .input('telefono', sql.VarChar, telefono)
    .input('direccion', sql.VarChar, direccion)
    .input('dni', sql.VarChar, dni)
    .query(`
      INSERT INTO Usuarios (email, password, nombre, apellido, telefono, direccion, dni)
      VALUES (@email, @password, @nombre, @apellido, @telefono, @direccion, @dni)
    `);
};

module.exports = { getUserByEmail, insertUser };
