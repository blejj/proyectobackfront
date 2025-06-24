const { poolPromise, sql } = require('../config/db');

const insertCard = async ({ nroTarjeta, fechaVencimiento, clave, idUsuario, importe }) => {
  const pool = await poolPromise;
  await pool.request()
    .input('nroTarjeta', sql.VarChar, nroTarjeta)
    .input('fechaVencimiento', sql.VarChar, fechaVencimiento)
    .input('clave', sql.VarChar, clave)
    .input('idUsuario', sql.Int, idUsuario)
    .input('importe', sql.Decimal(10, 2), importe)
    .query(`
      INSERT INTO Tarjetas (nroTarjeta, fechaVencimiento, clave, idUsuario, importe)
      VALUES (@nroTarjeta, @fechaVencimiento, @clave, @idUsuario, @importe)
    `);
};


const getCardById = async (idTarjeta) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('idTarjeta', sql.Int, idTarjeta)
    .query('SELECT * FROM Tarjetas WHERE idTarjeta = @idTarjeta');

  return result.recordset[0];
};

const deleteCard = async (idTarjeta) => {
  const pool = await poolPromise;
  await pool.request()
    .input('idTarjeta', sql.Int, idTarjeta)
    .query('DELETE FROM Tarjetas WHERE idTarjeta = @idTarjeta');
};

module.exports = { insertCard, getCardById, deleteCard };
