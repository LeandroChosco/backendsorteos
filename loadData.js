const mongoose = require('mongoose');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const loadItems = require('./models/loadItems'); // Asegúrate de que la ruta sea correcta
const app = express();
const port = process.env.PORT || 3000;
dotenv.config(); // Cargar las variables de entorno


app.use(cors());
// Middleware para analizar datos JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


// Leer el archivo JSON
const cargarItems = async () => {
    try {
      const data = fs.readFileSync('monturas.json', 'utf-8'); // Ruta al archivo JSON
      const items = JSON.parse(data); // Convertir el contenido a un objeto
  
      // Insertar los items en la base de datos
      await loadItems.insertMany(items);
      console.log('Items cargados exitosamente');
      
      // Cerrar la conexión a la base de datos
      mongoose.connection.close();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      mongoose.connection.close();
    }
  };
  
  cargarItems();