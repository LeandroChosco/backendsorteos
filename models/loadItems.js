// models/AlbionUser.js
const mongoose = require('mongoose');

const AlbionItemsSchema = new mongoose.Schema({
  valor: String,
  texto: String
});

module.exports = mongoose.model('loadItems', AlbionItemsSchema);