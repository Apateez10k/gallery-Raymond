const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const listSchema = new mongoose.Schema({
  place_id: { unique: true, type: Number },
  name: String,
  photos: String,
});

const list = mongoose.model('list', listSchema);

module.exports = list;
