//lo primero es importar las librerias
const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

//inicializar la app
const app = express();

//middleware para devolver la informacion en JSON
app.use(express.json());

//middleware para aceptar solicitudes externas
app.use(cors());

//vamos a hacer la conexion de datos
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Sistemadehoteles',
    password: '12345678',
    port: 5432
});


//VAMOS A HACER LAS RUTAS DEL API

//aviso de funcionamiento del API
app.get('/', async(req,res) => {
    try {
        res.json({mensaje: 'Api funcionando correctamente!'});
    } catch (error) {
        
    }
});


// para obtener todos los clientes
app.get('/clientes', async(req,res) => {
    try {
        const result= await pool.query('select * from clientes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// para obtener todas las habitaciones
app.get('/habitaciones', async(req,res) => {
    try {
        const result= await pool.query('select * from habitaciones');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// para obtener todas las reservas
app.get('/reservas', async(req,res) => {
    try {
        const result= await pool.query('select * from reservas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// para obtener todos los tipos de habitaciones
app.get('/tipos_habitaciones', async(req,res) => {
    try {
        const result= await pool.query('select * from tipos_habitaciones');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// para obtener todos los pagos
app.get('/pagos', async(req,res) => {
    try {
        const result= await pool.query('select * from pagos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// ruta para los post
//crear un nuevo cliente
app.post('/clientes', async(req,res) =>{
    try {
        const {username, email} = req.body;
        const result = await pool.query(
            'INSERT INTO clientes (username,email) VALUES ($1,$2)',
            [username,email]
        );

        res.json({
            mensaje: 'Cliente creado correctamente',
            cliente: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/habitaciones', async(req,res) =>{
    try {
        const {nombre_habitacion} = req.body;
        const result = await pool.query(
            'INSERT INTO habitaciones (nombre_habitacion) VALUES ($1)',
            [nombre_habitacion]
        );

        res.json({
            mensaje: 'Habitación creada correctamente',
            habitacion: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/reservas', async(req,res) =>{
    try {
        const {nombre_habitacion,precio,clientes_id,habitacion_id} = req.body;
        const result = await pool.query(
            'INSERT INTO reservas (nombre_habitacion, precio, clientes_id, habitaciones_id) VALUES ($1,$2,$3,$4)',
            [nombre_habitacion,precio,clientes_id,habitacion_id]
        );

        res.json({
            mensaje: 'Reserva creada correctamente',
            reserva: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/tipos_habitaciones', async(req,res) =>{
    try {
        const {tipos_habitacion,habitaciones_id} = req.body;
        const result = await pool.query(
            'INSERT INTO tipos_habitaciones (tipos_habitacion, habitaciones_id) VALUES ($1,$2)',
            [tipos_habitacion,habitaciones_id]
        );

        res.json({
            mensaje: 'Tipo de habitación creado correctamente',
            tipo_habitacion: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.post('/pagos', async(req,res) =>{
    try {
        const {clientes_id,habitaciones_id} = req.body;
        const result = await pool.query(
            'INSERT INTO pagos (clientes_id, habitaciones_id) VALUES ($1,$2)',
            [clientes_id,habitaciones_id]
        );

        res.json({
            mensaje: 'Pago creado correctamente',
            pago: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



//para probar el api vamos a arrancar el servidor
app.listen(3000, () => {
    console.log('servidor corriendo en la ruta http://localhost:3000');
});
