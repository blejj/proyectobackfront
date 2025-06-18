const sql = require('mssql');

const config = {
  user: 'FranB',
  password: 'Test1234',
  server: 'DESKTOP-KDUF4HE\\FRANCOBD',
  database: 'Libreria',
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  port: 5964
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

module.exports = { sql, poolPromise };
