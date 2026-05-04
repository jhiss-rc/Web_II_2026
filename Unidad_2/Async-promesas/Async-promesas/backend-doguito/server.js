// funciones diferenciales
import express from "express"; //importacion hacia el uso de express
import cors from "cors"; //libreria que nos permite tener la comunicacion con sql
import dotenv from "dotenv"; //libreria que permite usar las variables del archivo .env
import pool from "./conexion.js"; //importacion de la piscina de datos

dotenv.config(); //cargar las variables de entorno
const app = express(); //llamadas a express en variable
app.use(cors()); //uso de cors
app.use(express.json()); //uso de archivos json

//get listar
app.get("/cliente", async(req, res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM cliente"); //consulta a sql para listar los clientes
        res.json(rows); //respuesta en formato json
    }catch (err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
})

//get por id
app.get("/cliente/:id", async(req,res)=>{
    try{
        const [rows] = await pool.query(
            "SELECT * FROM cliente WHERE id = ?", [req.params.id]); //consulta a sql para listar un cliente por id
            // verificacion de que existe cliente

    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//POST crear cliente
app.post("/cliente", async(req, res)=>{
    try{
        const {id, nombre, email}=req.body; //datos que se reciben del cliente
        await pool.query("INSERT INTO cliente (id,nombre, email) VALUES (?,?,?)",[id, nombre, email]);
        res.status(201).json({id,nombre,email});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// PUT actualizar cliente
app.put("/cliente/:id", async(req, res)=>{
    try{
        const {nombre, email} = req.body; //datos que se modifican del cliente
        await pool.query("UPDATE cliente SET nombre = ?, email = ? WHERE id = ?", [nombre, email, resq.params.id]); //con params porque es la referencia de datos
        res.json({mensaje:"actualizado"});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// DELETE eliminar cliente
app.delete("/cliente/:id", async(req, res)=>{
    try{
        await pool.query("DELETE FROM cliente WHERE id = ?", [req.params.id]); //consulta a sql para eliminar un cliente por id
        res.json({mensaje:"eliminadooo"}); //es para indicar que se elimino el cliente, es un mensaje
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

app.listen(process.env.PORT, () =>{
    console.log(`Server corriendo en puerto ${process.env.PORT}`); //mensaje de que el servidor esta corriendo
});