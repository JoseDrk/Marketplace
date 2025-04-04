// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexión a SQL Server
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, username, email FROM Users');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query`SELECT id, username, email FROM Users WHERE id = ${req.params.id}`;
        if (result.recordset.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Actualizar usuario (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
    const { username, email } = req.body;
    try {
        await db.query`UPDATE Users SET username = ${username}, email = ${email} WHERE id = ${req.params.id}`;
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar usuario (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await db.query`DELETE FROM Users WHERE id = ${req.params.id}`;
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;