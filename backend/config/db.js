const sql = require('mssql');

const config = {
  user: 'FranB',
  password: 'Test1234',
  server: '127.0.0.1',
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
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar con SQL Server', err);
  });

module.exports = { sql, poolPromise };
