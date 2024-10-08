
const mongoose = require('mongoose');

const albionUserSchema = new mongoose.Schema({
  userAlbion: {
    type: String,
    required: true,
  },
  items: {
    type: String, // Array de items
    required: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'entregado'], // Puedes personalizar los estados
  },
  cliente:{
    type: String,
    required: true
  },
  fecha: {
    type: String,
    default: Date.now, // Fecha de creación
  },
},{ collection: 'testItems' });

const AlbionUser = mongoose.model('AlbionUser', albionUserSchema);

module.exports = AlbionUser;
