const generator = require('../database/generateData.js');
const fs = require('fs');

describe('Data generation script', () => {
  test('can generate .csv file with arbitrary number of records', (done) => {
    generator.write('seedData10.csv', 10)
      .then(() => {
        fs.readFile('../database/seedData10.csv', 'utf8', (err, data) => {
          if (err) {
            console.log('file read error: ', err);
          } else {
            const contents = data.trim().split('\n');
            const regex = /[0-9][0-9]*,"[A-Za-z\s-,]*","{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
            for (let i = 0; i < contents.length; i += 1) {
              expect(contents[i].match(regex)).not.toBe(null);
              if (i === 9) {
                done();
              }
            }
          }
        });
      })
        .catch((err) => {
          console.log('file write error: ', err);
          done();
        });
  });

  test('can generate .tsv file with arbitrary number of records', (done) => {
    generator.write('seedData10.tsv', 10)
      .then(() => {
        fs.readFile('../database/seedData10.tsv', 'utf8', (err, data) => {
          if (err) {
            console.log('file read error: ', err);
          } else {
            const contents = data.trim().split('\n');
            const regex = /[0-9][0-9]*\s"[A-Za-z\s-,]*"\s"{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
            for (let i = 0; i < contents.length; i += 1) {
              expect(contents[i].match(regex)).not.toBe(null);
              if (i === 9) {
                done();
              }
            }
          }
        });
      })
        .catch((err) => {
          console.log('file write error: ', err);
          done();
        });
  });

  test('can generate .json file with arbitrary number of records', (done) => {
    generator.write('seedData10.json', 10)
      .then(() => {
        fs.readFile('../database/seedData10.json', 'utf8', (err, data) => {
          if (err) {
            console.log('file read error: ', err);
          } else {
            const contents = JSON.parse(data);
            for (let i = 0; i < contents.length; i += 1) {
              expect(typeof contents[i].id).toBe('number');
              expect(typeof contents[i].name).toBe('string');
              expect(Array.isArray(contents[i].photos)).toBe(true);
              expect(contents[i].photos.length).toBe(10);
              for (var j = 0; j < contents[i].photos.length; j += 1) {
                expect(contents[i].photos[j]).toBe('https://loremflickr.com/3000/2000/sanfrancisco');
              }
              if (i === 9) {
                done();
              }
            }
          }
        });
      })
        .catch((err) => {
          console.log('file write error: ', err);
          done();
        });
  });
});
