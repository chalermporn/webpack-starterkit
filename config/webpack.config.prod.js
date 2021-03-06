var path 				= require('path');
var CleanWebpackPlugin 	= require('clean-webpack-plugin');
var ExtractTextPlugin 	= require('extract-text-webpack-plugin');
var webpack 			= require('webpack');

var appName = 'starter';
var baseFolder = __dirname + '/..';

var extractIndex = new ExtractTextPlugin('index.html');
var extractCSS = new ExtractTextPlugin(appName + '.css');

module.exports = {
	context: path.resolve(baseFolder, 'src'),
	entry: './js/index.js',
	output: {
		path: path.resolve(baseFolder, 'build'),
		filename: appName + '.js'
	},
	debug: true,
	plugins: [
		// Remove build folder before starting
		new CleanWebpackPlugin(['build'], {
			root: process.cwd(),
			verbose: true, 
			dry: false
		}),
		extractIndex,
		extractCSS,
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: extractCSS.extract('style-loader', '!css!sass')
			},
			{
				test: /\.html$/,
				loader: extractIndex.extract('html')
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(.*)?$/,
				loader: 'file?name=assets/fonts/[name].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	},
	devServer: {
		contentBase: './build'
	},

	imageWebpackLoader: {
		pngquant: {
			quality: '75-90',
			speed: 4
		}
	}
};