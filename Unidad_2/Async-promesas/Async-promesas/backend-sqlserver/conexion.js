const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,              // cambiar a true si usas Azure
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect()
    .then(() => console.log('Conectado a SQL Server'))
    .catch(err => {
        console.error('Error de conexion:', err.message);
        process.exit(1); // detiene el proceso si no puede conectar
    });

module.exports = { pool, poolConnect, sql };
