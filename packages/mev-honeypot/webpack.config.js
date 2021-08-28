// @config webpack 
const json5 = require("json5");
const path = require('path');

module.exports = {
    entry: './index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
 },
	module: {
		rules: [
			{
				test: /\.json5$/,
				type: "json",
				parser: {
					parse: json5.parse
				},
			},
		],

	}
};