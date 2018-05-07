const fs = require('fs');
const faker = require('faker');

const write = function(filename, numRecords) {
  return new Promise((resolve, reject) => {
    let photoArr;
    if (filename.includes('.json')) {
      photoArr = '["https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco"]';
    } else {
      photoArr = '{https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco}';
    }

    let delimiter;
    if (filename.includes('.tsv')) {
      delimiter = '\t';
    } else if (filename.includes('.csv')) {
      delimiter = ',';
    }

    const options = {
      autoClose: true,
    };
    const writeStream = fs.createWriteStream(filename, options);
    writeStream.on('finish', resolve);

    let i = 1;
    let ok = true;
    while (i <= numRecords && ok) {
      if (!filename.includes('.json')) {
        if (i === numRecords) {
          writeStream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
        } else {
          ok = writeStream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
        }
      } else if (i === 1) {

        writeStream.write(`[{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}},\n`);
      } else if (i === parseInt(numRecords)) {
        writeStream.write(`{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}}]`);
      } else {
        ok = writeStream.write(`{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}},\n`);
      }
      i += 1;
    }

    if (i < numRecords) {
      writeStream.once('drain', write);
    } else if (i == numRecords + 1) {
      writeStream.end();
    }
    writeStream.once('error', reject);
  });
};

module.exports.write = write;
