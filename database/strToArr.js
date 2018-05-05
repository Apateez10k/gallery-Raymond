

const list = require('./list.js');

list.update({}, {photos: ['https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco','https://loremflickr.com/3000/2000/sanfrancisco']}, {multi:true}).then(() => {
  console.log('DB SEEDED');
}).catch((err) => {
  console.log('DB SEED ERROR: ', err);
});
