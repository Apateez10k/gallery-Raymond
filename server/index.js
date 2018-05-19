require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const list = require('../database/list.js');
const morgan = require('morgan');
const redis = require('redis');

const localRedisClient = redis.createClient();
const remoteRedisClient = redis.createClient({ host: '52.52.39.53', port: 6379 });

//// if you'd like to select database 3, instead of 0 (default), call if you'd lik
// client.select(3, function() { /* ... */ });

localRedisClient.on('error', err => {
  console.log('Error ', err);
});

remoteRedisClient.on('error', err => {
  console.log('Error ', err);
});

const app = express();
const PORT = 3002;
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/restaurants/', express.static(`${__dirname}/../public`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  //get from remoteRedis first. if not in remote redis, get from localRedis
  remoteRedisClient.get(req.params.id, (err, remoteRedisRes) => {
    if (err) {
      console.log('remote cache query error:');
      throw err;
    } else if (remoteRedisRes !== null) {
      res.send(remoteRedisRes);
    } else {
      localRedisClient.get(req.params.id, (err, localRedisRes) => {
        if (err) {
          console.log('instance cache query error:');
          throw err;
        } else if (localRedisRes !== null) {
          remoteRedisClient.set(req.params.id, localRedisRes, 'EX', 1800);
          res.send(localRedisRes);
        } else {
          list.find({ place_id: req.params.id }).lean()
            .then(photos => {
              localRedisClient.set(req.params.id, JSON.stringify(photos[0]), 'EX', 1800);
              res.send(photos[0]);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  });

});

// search Functionality in header
app.get('/:searchValue', (req, res) => {
  const searchQuery = req.params.searchValue;
  // recurse the search string and take off last char of the search string at every loop
  var recursefindPlaceId = function (searchQuery) {
    const query = list.findOne({ name: { $regex: searchQuery, $options: 'i' } });
    query.exec((err, photos) => {
      if (err) {
        console.log(err);
      } else if (photos) {
        res.send({ place_id: photos.place_id });
      } else {
        searchQuery = searchQuery.slice(0, -1);
        recursefindPlaceId(searchQuery);
      }
    });
  };
  recursefindPlaceId(searchQuery);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

