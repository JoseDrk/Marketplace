// routes/productos.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexión a SQL Server
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre, precio, stock FROM Productos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query`SELECT id, nombre, precio, stock FROM Productos WHERE id = ${req.params.id}`;
        if (result.recordset.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Crear un nuevo producto (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        await db.query`INSERT INTO Productos (nombre, precio, stock) VALUES (${nombre}, ${precio}, ${stock})`;
        res.status(201).json({ message: 'Producto creado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// Actualizar un producto (requiere autenticación)
router.put('/:id', authMiddleware, async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        await db.query`UPDATE Productos SET nombre = ${nombre}, precio = ${precio}, stock = ${stock} WHERE id = ${req.params.id}`;
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto (requiere autenticación)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await db.query`DELETE FROM Productos WHERE id = ${req.params.id}`;
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;