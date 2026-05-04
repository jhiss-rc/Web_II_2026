import mysql from "mysql2/promise"; //libreria para la conexion a sql
import dotenv from "dotenv"; //libreria que permite usar las variables del archivo .env
dotenv.config(); //cargar las variables de entorno

const pool = mysql.createPool({ //se crea uan varible como psicina de datos, se indica lo que se llama en el .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true, //esperar a que se libere una conexion
    connectionLimit: 10, //limite de conexiones
});

pool.getConnection().then((conn)=>{
    console.log("Todo chido")
    conn.release();
}).catch((err)=>console.error("Todo mal",err.message));
export default pool; //exportar la piscina de datos para usarla en otros archivos