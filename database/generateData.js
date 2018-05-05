// if there are no required arguments, exit
if (process.argv[2] === undefined || process.argv[3] === undefined) {
  console.log('Missing filename or quantity arguments');
  console.log('Correct use: node generateData.js <filename ending in .tsv, .csv, or .json> <number of records to generate>');
  process.exit(1);
}

// if the filename is incorrect, exit
if (!process.argv[2].includes('.tsv') && !process.argv[2].includes('.csv') && !process.argv[2].includes('.json')) {
  console.log('Filename argument is not .tsv, .csv, or .json format');
  process.exit(1);
}

const fs = require('fs');
const faker = require('faker');

// file format flags
const isTSV = process.argv[2].includes('.tsv');
const isCSV = process.argv[2].includes('.csv');
const isJSON = process.argv[2].includes('.json');

const numRecords = parseInt(process.argv[3]);


const options = {
  autoClose: true,
};
const writeStream = fs.createWriteStream(process.argv[2], options);


let photoArr;
if (isJSON) {
  photoArr = '["https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco","https://loremflickr.com/3000/2000/sanfrancisco"]';
} else {
  photoArr = '{https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco,https://loremflickr.com/3000/2000/sanfrancisco}';
}

let delimiter;
if (isTSV) {
  delimiter = '\t';
} else if (isCSV) {
  delimiter = ',';
}

let i = 1;
const write = function () {
  let ok = true;
  while (i <= numRecords && ok) {
    if (!isJSON) {
      if (i === numRecords) {
        writeStream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
      } else {
        ok = writeStream.write(`${i}${delimiter}"${faker.company.companyName()}"${delimiter}"${photoArr}"\n`);
      }
    } else if (i === 1) {
      writeStream.write(`[{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}},\n`);
    } else if (i === numRecords) {
      writeStream.write(`{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}}]`);
    } else {
      ok = writeStream.write(`{"id":${i},"name":"${faker.company.companyName()}","photos":${photoArr}},\n`);
    }
    i += 1;
  }
  if (i <= numRecords) {
    writeStream.once('drain', write);
  }
};
write();

module.exports.write = write;
