const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, poolConnect, sql } = require('./conexion');

const app = express();
app.use(cors());
app.use(express.json());


// GET listar todos
app.get('/cliente', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM cliente');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET por id
app.get('/cliente/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM cliente WHERE id = @id');
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear
app.post('/cliente', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, email } = req.body;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('email', sql.NVarChar, email)
            .query('INSERT INTO cliente (nombre, email) OUTPUT INSERTED.* VALUES (@nombre, @email)');
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar
app.put('/cliente/:id', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, email } = req.body;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, nombre)
            .input('email', sql.NVarChar, email)
            .query('UPDATE cliente SET nombre = @nombre, email = @email WHERE id = @id');
        res.json({ mensaje: 'Cliente actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE eliminar
app.delete('/cliente/:id', async (req, res) => {
    try {
        await poolConnect;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM cliente WHERE id = @id');
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// GET listar todos
app.get('/pet', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM pet');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET por id
app.get('/pet/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM pet WHERE id = @id');
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Pet no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear
app.post('/pet', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, edad, raza, peso, cliente_id } = req.body;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('edad', sql.Int, edad)
            .input('raza', sql.NVarChar, raza)
            .input('peso', sql.Decimal(5,2), peso)
            .input('cliente_id', sql.Int, cliente_id)
            .query(`INSERT INTO pet (nombre, edad, raza, peso, cliente_id)
                    OUTPUT INSERTED.*
                    VALUES (@nombre, @edad, @raza, @peso, @cliente_id)`);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar
app.put('/pet/:id', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, edad, raza, peso, cliente_id } = req.body;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, nombre)
            .input('edad', sql.Int, edad)
            .input('raza', sql.NVarChar, raza)
            .input('peso', sql.Decimal(5,2), peso)
            .input('cliente_id', sql.Int, cliente_id)
            .query(`UPDATE pet SET nombre=@nombre, edad=@edad, raza=@raza,
                    peso=@peso, cliente_id=@cliente_id WHERE id=@id`);
        res.json({ mensaje: 'Pet actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE eliminar
app.delete('/pet/:id', async (req, res) => {
    try {
        await poolConnect;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM pet WHERE id = @id');
        res.json({ mensaje: 'Pet eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// GET listar todos
app.get('/producto', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM producto');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET por id
app.get('/producto/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM producto WHERE id = @id');
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear
app.post('/producto', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, precio } = req.body;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('precio', sql.Decimal(10,2), precio)
            .query('INSERT INTO producto (nombre, precio) OUTPUT INSERTED.* VALUES (@nombre, @precio)');
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar
app.put('/producto/:id', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, precio } = req.body;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, nombre)
            .input('precio', sql.Decimal(10,2), precio)
            .query('UPDATE producto SET nombre = @nombre, precio = @precio WHERE id = @id');
        res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE eliminar
app.delete('/producto/:id', async (req, res) => {
    try {
        await poolConnect;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM producto WHERE id = @id');
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en puerto ${process.env.PORT}`);
});
