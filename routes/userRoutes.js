// routes/albionUserRoutes.js
const express = require('express');
const AlbionUser = require('../models/user');
const router = express.Router();
const LoadItems = require('../models/loadItems');

// Crear un nuevo usuario de Albion
router.post('/add', async (req, res) => {
  try {
    const { userAlbion, items, estado, cliente, fecha } = req.body;
    const albionUser = new AlbionUser({ userAlbion, items, estado, cliente, fecha });
    await albionUser.save();
    res.status(201).json(albionUser);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario Albion', error });
  }
});

// Obtener todos los usuarios de Albion
router.post('/getAll', async (req, res) => {
    try {
      const { cliente } = req.body; // Obtener el cliente del cuerpo de la solicitud
      
      let query = {};
      if (cliente) {
        query.cliente = cliente; // Agregar el filtro por cliente si se pasa en el cuerpo
      }
  
      const albionUsers = await AlbionUser.find(query);
      res.status(200).json(albionUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios Albion', error });
    }
  });

//cargar datos de items

router.get('/items', async (req, res) => {
    try {
      const items = await LoadItems.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener items', error });
    }
  });

// Eliminar un usuario de Albion por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const albionUser = await AlbionUser.findByIdAndDelete(id);
    if (!albionUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar usuario Albion', error });
  }
});


module.exports = router;
