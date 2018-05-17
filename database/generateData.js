const fs = require('fs');
const faker = require('faker');

let name;
let numRec;
let i = 1;
let callback;
let options = {
  autoClose: true,
};
let stream = fs.createWriteStream(process.argv[2], options);
stream.on('close', () => {
  console.log('done');
});

const write = function(filename, numRecords, writeStream, callback) {
  name = filename || name;
  numRec = numRecords || numRec;
  stream = writeStream || stream;
  callback = callback || () => {
    console.log('done!');
  };
  let photoArr;
  let isJSON = name.includes('.json');
  let isTSV = name.includes('.tsv');
  let isCSV = name.includes('.csv');
  if (isJSON) {
    photoArr = `["https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco", "https://loremflickr.com/3000/2000/sanfrancisco"]`;
  } else {
    photoArr = '{https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco}';
  }

  let delimiter;
  if (isTSV) {
    delimiter = '\t';
  } else if (isCSV) {
    delimiter = ',';
  }

  // stream.on('close', callback);

  let ok = true;
  while (i <= numRec && ok) {
    if (!isJSON) {
      if (i === numRec) {
        stream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
      } else {
        ok = stream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
      }
    } else if (i === 1) {

      stream.write(`[{"place_id":${i},"restaurantName":"${faker.company.companyName()}","photoArray":${photoArr}},\n`);
    } else if (i === parseInt(numRec)) {
      stream.write(`{"place_id":${i},"restaurantName":"${faker.company.companyName()}","photoArray":${photoArr}}]`);
    } else {
      ok = stream.write(`{"place_id":${i},"restaurantName":"${faker.company.companyName()}","photoArray":${photoArr}},\n`);
    }
    i += 1;
  }
  if (i <= numRec) {
    stream.once('drain', write);
  }
  else if (i == numRec + 1) {
    i = 1;
    stream.end();
  }
};

module.exports.write = write;
