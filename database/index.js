const mongoose = require('mongoose');

const mongoUri = 'mongodb://devadmin:devadmin@52.8.5.97:27017/apateez-gallery';
// const mongoUri = 'mongodb://database/apateez-gallery';

const db = mongoose.connect(mongoUri, { poolSize: 100 });

module.exports = db;
