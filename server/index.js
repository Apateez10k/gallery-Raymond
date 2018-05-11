require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const list = require('../database/list.js');
const mockData = require('./mockData.js');
const redis = require('redis');
const redisClient = redis.createClient();

//// if you'd like to select database 3, instead of 0 (default), call if you'd lik
// client.select(3, function() { /* ... */ });

redisClient.on("error", function (err) {
    console.log("Error " + err);
});

const app = express();
const PORT = 3002;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  redisClient.get(req.params.id, (err, redisRes) => {
    if (err) {
      console.log('cache query error:');
      throw err;
    } else if (redisRes !== null) {
      res.send(redisRes);
    } else {
      list.find({ place_id: req.params.id }).lean()
        .then((photos) => {
          redisClient.set(req.params.id, JSON.stringify(photos[0]), 'EX', 1800);
          res.send(photos[0]);
        })
          .catch((err) => {
            console.log(err);
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
