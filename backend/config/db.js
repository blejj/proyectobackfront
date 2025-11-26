// backend/config/db.js
require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // tu config actual
    trustServerCertificate: true
  }
};

let pool;

/**
 * Devuelve un pool reutilizable de SQL Server.
 */
async function getConnection() {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(dbConfig);
    console.log("✅ Pool SQL Server inicializado");
    return pool;

  } catch (error) {
    console.error("❌ Error creando pool de SQL Server:", error);
    throw error;
  }
}

module.exports = {
  sql,
  getConnection
};
