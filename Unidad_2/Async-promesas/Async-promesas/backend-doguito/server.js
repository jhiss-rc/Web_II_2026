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
            "SELECT * FROM cliente WHERE id = ?", [req.params.id]);
            if(rows.length === 0) return res.status(404).json({error: "Cliente no encontrado"});
            res.json(rows[0]);
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//POST crear cliente
app.post("/cliente", async(req, res)=>{
    try{
        const {id, nombre, email}=req.body; //datos que se reciben del cliente
        await pool.query("INSERT INTO cliente (id, nombre, email) VALUES (?, ?, ?)",[id, nombre, email]);
        res.status(201).json({id, nombre, email});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// PUT actualizar cliente
app.put("/cliente/:id", async(req, res)=>{
    try{
        const {nombre, email} = req.body; //datos que se modifican del cliente
        await pool.query("UPDATE cliente SET nombre = ?, email = ? WHERE id = ?", [nombre, email, req.params.id]); //con params porque es la referencia de datos
        res.json({mensaje:"actualizado"});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// DELETE eliminar cliente
app.delete("/cliente/:id", async(req, res)=>{
    try{
        // primero eliminar las mascotas del cliente
        await pool.query("DELETE FROM pets WHERE cliente_id = ?", [req.params.id]);
        await pool.query("DELETE FROM cliente WHERE id = ?", [req.params.id]); //consulta a sql para eliminar un cliente por id
        res.json({mensaje:"eliminadooo"}); //es para indicar que se elimino el cliente, es un mensaje
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});



//---------Productos---------
app.get("/productos", async(req, res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM productos"); //consulta a sql para listar los productos
        res.json(rows); //respuesta en formato json
    }catch (err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//get por id
app.get("/productos/:id", async(req,res)=>{
    try{
        const [rows] = await pool.query(
            "SELECT * FROM productos WHERE id = ?", [req.params.id]);
            if(rows.length === 0) return res.status(404).json({error: "Producto no encontrado"});
            res.json(rows[0]);
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//POST crear producto
app.post("/productos", async(req, res)=>{
    try{
        const {id, nombre, precio}=req.body;
        await pool.query("INSERT INTO productos (id, nombre, precio) VALUES (?, ?, ?)",[id, nombre, precio]);
        res.status(201).json({id, nombre, precio});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// PUT actualizar producto
app.put("/productos/:id", async(req, res)=>{
    try{
        const {nombre, precio} = req.body; //datos que se modifican del producto
        await pool.query("UPDATE productos SET nombre = ?, precio = ? WHERE id = ?", [nombre, precio, req.params.id]); //con params porque es la referencia de datos
        res.json({mensaje:"actualizado"});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// DELETE eliminar producto
app.delete("/productos/:id", async(req, res)=>{
    try{
        await pool.query("DELETE FROM productos WHERE id = ?", [req.params.id]); //consulta a sql para eliminar un producto por id
        res.json({mensaje:"eliminadooo"}); //es para indicar que se elimino el producto, es un mensaje
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});


//----------PETS---------
app.get("/pets", async(req, res)=>{
    try{
        const [rows] = await pool.query("SELECT * FROM pets"); //consulta a sql para listar las mascotas
        res.json(rows); //respuesta en formato json
    }catch (err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//get por id
app.get("/pets/:id", async(req,res)=>{
    try{
        const [rows] = await pool.query(
            "SELECT * FROM pets WHERE id = ?", [req.params.id]);
            if(rows.length === 0) return res.status(404).json({error: "mascota no encontrada"});
            res.json(rows[0]);
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

//POST crear pet
app.post("/pets", async(req, res)=>{
    try{
        const {id, nombre, edad, raza, peso, cliente_id }=req.body;
        await pool.query("INSERT INTO pets (id, nombre, edad, raza, peso, cliente_id) VALUES (?, ?, ?, ?, ?, ?)",[id, nombre, edad, raza, peso, cliente_id]);
        res.status(201).json({id, nombre, edad, raza, peso, cliente_id});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// PUT actualizar pets
app.put("/pets/:id", async(req, res)=>{
    try{
        const {nombre, edad, raza, peso, cliente_id} = req.body; //datos que se modifican de la mascota
        await pool.query("UPDATE pets SET nombre = ?, edad = ?, raza = ?, peso = ?, cliente_id = ? WHERE id = ?", [nombre, edad, raza, peso, cliente_id, req.params.id]); //con params porque es la referencia de datos
        res.json({mensaje:"actualizado"});
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

// DELETE eliminar mascota
app.delete("/pets/:id", async(req, res)=>{
    try{
        await pool.query("DELETE FROM pets WHERE id = ?", [req.params.id]); //consulta a sql para eliminar una mascota por id
        res.json({mensaje:"eliminadooo"}); //es para indicar que se elimino la mascota, es un mensaje
    }catch(err){
        res.status(500).json({error: err.message}); //respuesta de error
    }
});

app.listen(process.env.PORT, () =>{
    console.log(`Server corriendo en puerto ${process.env.PORT}`); //mensaje de que el servidor esta corriendo
});
