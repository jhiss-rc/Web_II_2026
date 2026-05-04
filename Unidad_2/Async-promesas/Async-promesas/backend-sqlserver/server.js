const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, poolConnect, sql } = require('./conexion');

const app = express();
app.use(cors());
app.use(express.json());

// ─── CLIENTES ────────────────────────────────────────────────

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

// ─── PETS ────────────────────────────────────────────────────

// GET listar todos
app.get('/pets', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM pets');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET por id
app.get('/pets/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM pets WHERE id = @id');
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Pet no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear
app.post('/pets', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, edad, raza, peso, cliente_id } = req.body;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('edad', sql.Int, edad)
            .input('raza', sql.NVarChar, raza)
            .input('peso', sql.Decimal(5,2), peso)
            .input('cliente_id', sql.Int, cliente_id)
            .query(`INSERT INTO pets (nombre, edad, raza, peso, cliente_id)
                    OUTPUT INSERTED.*
                    VALUES (@nombre, @edad, @raza, @peso, @cliente_id)`);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar
app.put('/pets/:id', async (req, res) => {
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
            .query(`UPDATE pets SET nombre=@nombre, edad=@edad, raza=@raza,
                    peso=@peso, cliente_id=@cliente_id WHERE id=@id`);
        res.json({ mensaje: 'Pet actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE eliminar
app.delete('/pets/:id', async (req, res) => {
    try {
        await poolConnect;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM pets WHERE id = @id');
        res.json({ mensaje: 'Pet eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── PRODUCTOS ───────────────────────────────────────────────

// GET listar todos
app.get('/productos', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT * FROM productos');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET por id
app.get('/productos/:id', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM productos WHERE id = @id');
        if (result.recordset.length === 0)
            return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear
app.post('/productos', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, precio } = req.body;
        const result = await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('precio', sql.Decimal(10,2), precio)
            .query('INSERT INTO productos (nombre, precio) OUTPUT INSERTED.* VALUES (@nombre, @precio)');
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar
app.put('/productos/:id', async (req, res) => {
    try {
        await poolConnect;
        const { nombre, precio } = req.body;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nombre', sql.NVarChar, nombre)
            .input('precio', sql.Decimal(10,2), precio)
            .query('UPDATE productos SET nombre = @nombre, precio = @precio WHERE id = @id');
        res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE eliminar
app.delete('/productos/:id', async (req, res) => {
    try {
        await poolConnect;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM productos WHERE id = @id');
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── ARRANQUE ────────────────────────────────────────────────
app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en puerto ${process.env.PORT}`);
});
