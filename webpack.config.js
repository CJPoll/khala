var productName = process.env.PRODUCT_NAME || "audiences";
var path = require("path");
var fs = require("fs");

module.exports = {
	entry: path.resolve(__dirname, "./web/static/js/index.js"),
	context: __dirname,
	output: {
		path: "./priv/static/js",
		filename: "bundle.js"
	},
	resolve: {
		modulesDirectories: [
			'./node_modules',
			__dirname + "web/static/js"
		],
		extensions: ['', '.js', '.jsx', '.scss'],
		root: [path.resolve(__dirname, ".")]
	},
	eslint: {
		configFile: path.resolve(__dirname,'./.eslintrc')
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"]
				}
			},
			{
				loader: 'url-loader',
				query: {
					limit: 8192
				},
				test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/
			},
			{
				loader: 'style-loader!css-loader!sass-loader',
				test: /\.scss$/
			}
		]
	},
	plugins: []
};
