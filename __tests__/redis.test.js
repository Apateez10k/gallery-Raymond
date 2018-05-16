const axios = require('axios');
const list = require('../database/list.js');
const redis = require('redis');

const redisClient = redis.createClient();

describe('redis cache should', () => {
  test('contain the same data as in mongoDB for the same restaurant id', (done) => {
    axios('http://localhost:3002/api/restaurants/7/gallery')
      .then(response => {
        redisClient.get('7', (err, redisRes) => {
          if (err) {
            console.log('document not in redis!');
            expect(err).not.toBe(err);
            done();
          } else {
            list.find({place_id: '7'})
              .then(photos => {
                expect(redisRes).toBe(JSON.stringify(photos[0]));
                done();
              })
              .catch(err => {
                console.log('document not in mongoDB!');
                expect(err).not.toBe(err);
                done();
              });
          }
        });
      })
      .catch(err => {
        console.log('axios error: ', err);
        done();
      });
  });
});
