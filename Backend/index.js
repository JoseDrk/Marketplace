const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3001'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(session({
  secret: 'tu_secreto_super_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use(bodyParser.json());
app.use('/Marketplace/Backend/public', express.static(path.join(__dirname, 'public')));





// ✅ Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de Login!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
