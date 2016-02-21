var productName = process.env.PRODUCT_NAME || 'audiences';
var path = require('path');
var fs = require('fs');

module.exports = {
	entry: path.resolve(__dirname, './web/static/js/index.js'),
	context: __dirname,
	output: {
		path: './priv/static/js',
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: [
			path.resolve(__dirname, './web/static/js/components'),
			path.resolve(__dirname, './web/static/js/actions'),
			path.resolve(__dirname, './web/static/js/stores'),
			path.resolve(__dirname, './web/static/js/lib'),
			path.resolve(__dirname, './web/static/js/pages'),
			path.resolve(__dirname, './web/static/css/'),
			'./node_modules',
		],
		extensions: ['', '.js', '.jsx', '.scss'],
		root: [path.resolve(__dirname, '.')]
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
					presets: ['es2015', 'react']
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
