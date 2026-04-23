const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Sistemadehoteles',
    password: '12345678',
    port: 5432
});


app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});



// GET clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST clientes
app.post('/clientes', async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ mensaje: 'Faltan datos' });
        }

        const result = await pool.query(
            'INSERT INTO clientes (username, email) VALUES ($1, $2) RETURNING *',
            [username, email]
        );

        res.json({
            mensaje: 'Cliente creado correctamente',
            cliente: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE clientes
app.delete('/clientes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const result = await pool.query(
            'DELETE FROM clientes WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente',
            cliente: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE clientes
app.delete('/tipos_habitaciones/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ mensaje: 'ID inválido' });
        }

        const result = await pool.query(
            'DELETE FROM clientes WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente',
            cliente: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/habitaciones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM habitaciones ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/tipos_habitaciones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipos_habitaciones ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET reservas
app.get('/reservas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservas ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST reservas
app.post('/reservas', async (req, res) => {
    try {
        const { cliente_id, habitaciones_id, precio } = req.body;

        if (!cliente_id || !habitaciones_id || !precio) {
            return res.status(400).json({ mensaje: 'Faltan datos' });
        }

        const result = await pool.query(
            `INSERT INTO reservas (cliente_id, habitaciones_id, precio)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [cliente_id, habitaciones_id, precio]
        );

        res.json({
            mensaje: 'Reserva creada correctamente',
            reserva: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/pagos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pagos ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});