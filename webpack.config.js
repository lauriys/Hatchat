var webpack = require('webpack');

module.exports = {
	entry: {
		app: ['webpack/hot/dev-server', './src/app.jsx'],
	},
	output: {
		path: './public/build',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/build/'
	},
	devServer: {
		contentBase: './public',
		publicPath: 'http://localhost:8080/build/'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
			{ test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loaders: ['file-loader'] }
		]
	},
	node: {
		__dirname: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({'global.GENTLY': false})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.css'],
		modulesDirectories: ['node_modules', __dirname + '/node_modules/font-awesome/css']
	},
	target: 'electron'
}