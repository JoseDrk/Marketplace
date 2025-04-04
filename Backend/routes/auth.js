const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDBConnection, sql } = require('../database'); // Importar conexión correctamente
const authMiddleware = require('../middleware/authMiddleware'); 

const JWT_SECRET = 'tu_clave_secreta_super_segura';

// 1️⃣ **Registro de usuario**
router.post('/register', async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);

        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Obtener la conexión a la base de datos
        const pool = await getDBConnection();

        // Insertar usuario en la base de datos
        const query = "INSERT INTO Users (username, password, email) VALUES (@username, @password, @email)";
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .input('email', sql.VarChar, email)
            .query(query);

        console.log("Usuario registrado:", result);
        res.status(201).json({ message: "Usuario registrado con éxito" });

    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 2️⃣ **Inicio de sesión**
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Obtener conexión
        const pool = await getDBConnection();

        // Buscar usuario por email
        const user = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (user.recordset.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.recordset[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.recordset[0].id, email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// 3️⃣ **Ruta protegida de ejemplo**
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const pool = await getDBConnection();
        const user = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query('SELECT id, username, email FROM Users WHERE id = @id');

        res.json(user.recordset[0]);
    } catch (error) {
        console.error("Error en profile:", error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;