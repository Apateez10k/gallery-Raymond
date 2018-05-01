const db = require('./index.js');
const list = require('./list.js');
const fullList = require('./fullList.json');

const newList = [];
for (let i = 0; i < 100; i++) {
  newList.push(fullList[i].result);
}

const insertfullList = function () {
  list.create(newList)
    .then(() => db.disconnect());
};

insertfullList();

