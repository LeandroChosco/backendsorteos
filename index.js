require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({ origin: false }));
// Middleware para analizar datos JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Usar las rutas de usuarios
app.use('/api/users', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});