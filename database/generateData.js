
const fs = require('fs');
const faker = require('faker');

var options = {
  autoClose: true
};
var writeStream = fs.createWriteStream('seedData.tsv', options);
var i = 1;
var photoArr = "{https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco}";
var write = function() {
  var ok = true;
  while (i <= 10000000 && ok) {
    if (i === 10000000) {
      writeStream.write(`${i}\t${faker.company.companyName()}\t"${photoArr}"\n`);
    } else {
      ok = writeStream.write(`${i}\t${faker.company.companyName()}\t"${photoArr}"\n`);
    }
    i++;
  }
  if (i <= 10000000) {
    writeStream.once('drain', write);
  }
};
write();
