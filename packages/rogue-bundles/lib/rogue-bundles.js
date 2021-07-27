'use strict';

const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

module.exports = rogueBundles;
