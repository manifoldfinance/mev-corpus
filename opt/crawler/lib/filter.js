//https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}
const axios = require('axios');
var fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

var results = [];

function saveResult() {
	const write = fs.createWriteStream(path.resolve(__dirname, 'addresses_filtered.csv'));
	csv.writeToStream(write, results);
}

async function filter() {
	const stream = fs.createReadStream(path.resolve(__dirname, 'results.csv'));
	//.pipe(csv.parse({ headers: true }))
	csv
		.parseStream(stream, { headers: true })
		.on('error', (error) => console.error(error))
		.on('data', (row) => {
			if (row[' status'] == 'failed') {
				console.log('Found failed');
				results.push([row.address]);
			}
		})
		.on('end', async (rowCount) => {
			console.log(`Parsed ${rowCount} rows`);
			saveResult();
		});
}
filter();
exports.default = filter;
