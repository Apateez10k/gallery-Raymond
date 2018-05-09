const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'rj',
    password: '',
    database: 'apateez2',
  },
});

const dataPath = `${__dirname}/seedData.csv`;

const photoTable = function () {
  return new Promise((resolve, reject) => {
    knex.schema.raw('CREATE TABLE photos (id integer, name text, photos text[])').then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
};

photoTable().then(() => {
  knex.schema.raw(`COPY photos FROM '${dataPath}' delimiter '|' csv`).then(() => {
    console.log('db seeding success');
    knex.destroy(() => {
      console.log('db connection closed');
    });
  }).catch((err) => {
    console.log('db seeding error: ', err);
    knex.destroy(() => {
      console.log('db connection closed');
    });
  });
}).catch((err) => {
  console.log('Table creation error: ', err);
  knex.destroy(() => {
    console.log('db connection closed');
  });
});
