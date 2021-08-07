'use strict';

const Web3 = require('web3');
const web3 = new Web3();
const fs = require('fs');

/**
 * @function getTransaction
 * @summary gets transactions from block
 *
 */
async function getTransaction(block_no, index) {
	const tx = web3.eth.getTransactionFromBlock(block_no, i).then((res) => {
		return web3.eth.getTransactionReceipt(res.hash);
	});
	return tx;
}

function retryGetTransaction(block_no, index, retries = 10, err = null) {
	if (!retries) {
		return Promise.reject(err);
	}
	return getTransaction(block_no, index).catch(async (err) => {
		console.log(`Retrying ${from} block ${i}th transaction, ${retries - 1} try left`);
		await sleep(1000);
		return retryGetTransaction(block_no, index, retries - 1, err);
	});
}
//for one block
async function getContractsByBlock(block_no) {
	const tx_count = await web3.eth.getBlockTransactionCount(block_no);
	var txs = [];
	for (i = 0; i < tx_count; i++) {
		const tx = retryGetTransaction(block_no, i);
		txs.push(tx);
	}
	const contracts = (await Promise.all(txs))
		.filter((receipt) => receipt.contractAddress != null)
		.map((receipt) => receipt.contractAddress);
	return contracts;
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function saveToCSV(arr) {
	var file = fs.createWriteStream('contracts.txt', { flags: 'a' });
	file.on('error', function (err) {
		console.log('ERROR while writing to file');
	});
	arr.forEach(function (v) {
		file.write(v.join('\n') + '\n');
	});
	file.end();
}

function retryGetBlocks(from, retries = 10, err = null) {
	if (!retries) {
		return Promise.reject(err);
	}
	return get100blocks(from).catch(async (err) => {
		console.log(`Retrying from ${from}th block ${retries - 1} try left`);
		await sleep(15000);
		return retryGetBlocks(from, retries - 1, err);
	});
}

async function get100blocks(from) {
	console.log(`Crawling from ${from}th block`);
	var temp = [];
	for (var i = 1; i < 100; i++) {
		const block_no = from + i;
		const c = getContractsByBlock(block_no);
		temp.push(c);
	}
	const results = (await Promise.all(temp)).filter((l) => l.length != 0);
	saveToCSV(results);
	await sleep(1000);
	return results.length;
}

//CSV format
//block# index# txHash contractAddress
async function crawl() {
	var contractCount = 0;
	for (var base = 35000; base < 93380; base++) {
		contractCount += await retryGetBlocks(base * 100);
		console.log(`Found ${contractCount} contracts`);
	}
}

crawl();

/** module.exports = crawl; */
