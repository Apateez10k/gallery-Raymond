const generator = require('../database/generateData.js');
const fs = require('fs');

const options = {
  autoClose: true,
};

describe('Data generation script', () => {
  test('can generate .csv file with arbitrary number of records', (done) => {
    generator.write('seedData50.csv', 50, fs.createWriteStream('seedData50.csv', options), () => {
      fs.readFile('../database/seedData50.csv', 'utf8', (err, data) => {
        if (err) {
          console.log('file read error: ', err);
        } else {
          const contents = data.trim().split('\n');
          const regex = /[0-9][0-9]*,"[A-Za-z\s-,']*","{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
          for (let i = 0; i < contents.length; i += 1) {
            expect(contents[i].match(regex)).not.toBe(null);
            if (i === 49) {
              done();
            }
          }
        }
      });
    });
  });

  test('can generate .tsv file with arbitrary number of records', (done) => {
    generator.write('seedData50.tsv', 50, fs.createWriteStream('seedData50.tsv', options), () => {
      fs.readFile('../database/seedData50.tsv', 'utf8', (err, data) => {
        if (err) {
          console.log('file read error: ', err);
        } else {
          const contents = data.trim().split('\n');
          const regex = /[0-9][0-9]*\s"[A-Za-z\s-,']*"\s"{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
          for (let i = 0; i < contents.length; i += 1) {
            expect(contents[i].match(regex)).not.toBe(null);
            if (i === 49) {
              done();
            }
          }
        }
      });
    });
  });

  test('can generate .json file with arbitrary number of records', (done) => {
    generator.write('seedData50.json', 50, fs.createWriteStream('seedData50.json', options), () => {
      fs.readFile('../database/seedData50.json', 'utf8', (err, data) => {
        if (err) {
          console.log('file read error: ', err);
        } else {
          const contents = JSON.parse(data);
          for (let i = 0; i < contents.length; i += 1) {
            expect(typeof contents[i].place_id).toBe('number');
            expect(typeof contents[i].name).toBe('string');
            expect(Array.isArray(contents[i].photos)).toBe(true);
            expect(contents[i].photos.length).toBe(10);
            for (let j = 0; j < contents[i].photos.length; j += 1) {
              expect(contents[i].photos[j]).toBe('https://loremflickr.com/3000/2000/sanfrancisco');
            }
            if (i === 49) {
              done();
            }
          }
        }
      });
    });
  });
});
