const express = require('express');
const bodyParser = require('body-parser');
const { connectToDB, sql } = require('./database');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido al sistema de Login!');
});

// 1. Registrar un usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    try {
        const pool = await connectToDB();
        await pool
            .request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO Users (Username, Password) VALUES (@username, @password)');
        res.status(201).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario');
    }
});

// 2. Iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Faltan datos requeridos');
    }

    try {
        const pool = await connectToDB();
        const result = await pool
            .request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM Users WHERE Username = @username AND Password = @password');
        
        if (result.recordset.length > 0) {
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
});

// 3. Eliminar un usuario
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await connectToDB();
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users WHERE Id = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).send('Usuario eliminado exitosamente');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el usuario');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
