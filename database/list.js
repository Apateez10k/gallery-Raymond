const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;


// TODO RJ modification: add numerical auto incrementing id
const listSchema = new mongoose.Schema({
  id: { unique: true, type: Number },
  name: String,
  photos: Array,
});

const list = mongoose.model('list', listSchema);

module.exports = list;
