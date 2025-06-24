const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Sa112358',
  server: 'localhost',      
  port: 5964,              
  database: 'Libreria',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar con SQL Server', err);
  });

module.exports = { sql, poolPromise };