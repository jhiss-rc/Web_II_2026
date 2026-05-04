const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,            
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
    .then(() => console.log('Conectado a SQL Server'))
    .catch(err => console.error('Error de conexion:', err.message));

module.exports = { pool, poolConnect, sql };
