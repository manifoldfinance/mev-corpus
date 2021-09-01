//https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}

const axios = require('axios');
var fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

var status = [];
var results = [];

function getUrl(address) {
  return `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}`;
}

function isVerified(address) {
  return axios.get(getUrl(address)).then(function (response) {
    // handle success
    if (response.data.message != 'OK') {
      return {
        status: null,
        code: '',
      };
    } else if (response.data.result[0].SourceCode == '') {
      return {
        status: false,
        code: '',
      };
    } else {
      return {
        status: true,
        code: response.data.result[0].SourceCode,
      };
    }
  });
}

function saveToSolidity(address, code) {
  fs.writeFile(`contracts/${address}.sol`, code, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function saveResult() {
  const write = fs.createWriteStream(path.resolve(__dirname, 'results.csv'));
  csv.writeToStream(write, results);
}

async function download() {
  const stream = fs.createReadStream(
    path.resolve(__dirname, 'addresses_filtered.csv'),
  );
  //.pipe(csv.parse({ headers: true }))
  csv
    .parseStream(stream, { headers: true })
    .on('error', (error) => console.error(error))
    .on('data', (row) => {
      status.push({
        address: row.address,
        status: 'pending',
      });
    })
    .on('end', async (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      for (var i = 0; i <= status.length / 100; i++) {
        const sub_status = status.slice(i * 100, (i + 1) * 100);
        console.log(`Downloading ${i * 100} ~ ${(i + 1) * 100 - 1}`);
        const pr = sub_status.map((x, index) => {
          return isVerified(x.address)
            .catch(function (err) {
              return {
                status: null,
              };
            })
            .then((res) => {
              if (res.status == null) {
                return [x.address, 'failed'];
              } else if (res.status == false) {
                console.log(`${x.address} does not exist on etherscan`);
                return [x.address, 'N/A'];
              } else {
                console.log(`Downloading ${x.address}`);
                saveToSolidity(x.address, res.code);
                return [x.address, 'downloaded'];
              }
            });
        });
        await Promise.all(pr).then((values) => {
          values.forEach((x) => results.push(x));
        });
      }
      saveResult();
    });
}

download();
