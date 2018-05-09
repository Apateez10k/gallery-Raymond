const generator = require('./generateData.js');
const fs = require('fs');
// pass cmd line arguments into generator as input args

// I: filename (.tsv, .csv, or .json) & num of records
// O: output file of correct format with # of records

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

console.log('FILENAME: ', process.argv[2]);
console.log('NUM RECORDS: ', typeof parseInt(process.argv[3]));
let options = {
  autoClose: true,
};
let writeStream = fs.createWriteStream(process.argv[2], options);
generator.write(process.argv[2], parseInt(process.argv[3]), writeStream);
