
var shell = require('shelljs');
var fs = require('fs');

describe('Data generation script', () => {
   test('can generate .csv file with arbitrary number of records', (done) => {
     shell.exec('node ./database/generateData.js seedData10.csv 10', () => {
       console.log('yee');
       fs.readFile('./seedData10.csv', 'utf8', (err, data) => {
         if (err) {
           console.log('file read error: ', err);
         } else {
           var contents = data.trim().split('\n');
           console.log('records: ', contents.length);
           var regex = /[0-9][0-9]*,"[A-Za-z\s-,]*","{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
           for (var i = 0; i < contents.length; i++) {
             expect(contents[i].match(regex)).not.toBe(null);
           }
           if (i === 10) {
             done();
           }
         }
       });
     });
   });

   test('can generate .tsv file with arbitrary number of records', (done) => {
     shell.exec('node ./database/generateData.js seedData10.tsv 10', () => {
       console.log('yee');
       fs.readFile('./seedData10.tsv', 'utf8', (err, data) => {
         if (err) {
           console.log('file read error: ', err);
         } else {
           var contents = data.trim().split('\n');
           console.log('records: ', contents.length);
           var regex = /[0-9][0-9]*\s"[A-Za-z\s-,]*"\s"{https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco,https:\/\/loremflickr.com\/3000\/2000\/sanfrancisco}"/;
           for (var i = 0; i < contents.length; i++) {
             expect(contents[i].match(regex)).not.toBe(null);
           }
           if (i === 10) {
             done();
           }
         }
       });
     });
   });

   test('can generate .json file with arbitrary number of records', (done) => {
     shell.exec('node ./database/generateData.js seedData10.json 10', () => {
       console.log('yee');
       fs.readFile('./seedData10.json', 'utf8', (err, data) => {
         if (err) {
           console.log('file read error: ', err);
         } else {
           var contents = JSON.parse(data);
           for (var i = 0; i < contents.length; i++) {
             expect(typeof contents[i].id).toBe('number');
             expect(typeof contents[i].name).toBe('string');
             expect(Array.isArray(contents[i].photos)).toBe(true);
             expect(contents[i].photos.length).toBe(10);
             for (var j = 0; j < contents[i].photos.length; j++) {
               expect(contents[i].photos[j]).toBe("https://loremflickr.com/3000/2000/sanfrancisco");
             }
           }
           if (i === 10) {
             done();
           }
         }
       });
     });
   });

});
