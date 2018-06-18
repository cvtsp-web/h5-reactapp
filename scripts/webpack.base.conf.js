var path = require('path')
var glob = require('glob')
var utils = require('./utils')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname, '../');
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var entries = utils.getEntries('./src/views/**/index.js');

module.exports = {
	entry: Object.assign({}, entries.entry, {
		start: './src/views/start/index.js',
		vendor: ['react', 'react-dom']
	}),
	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		publicPath: ''
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': utils.resolve('src'),
			'@components': utils.resolve('src/components'),
			'@utils': utils.resolve('src/utils'),
			'@decorators': utils.resolve('src/decorators'),
			'@app': utils.resolve('src/app')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(less|css|scss)$/,
				include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
				use: [
					require.resolve('style-loader'),
					{
						loader: require.resolve('css-loader'),
						options: {
			              modules:false
			            }
					}
				]	
			},
			{
				test: /\.(less|css|scss)$/,
				exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/assets')],
				use: [
					require.resolve('style-loader'),
			        {
			            loader: require.resolve('css-loader')
			        },
			        {
			        		loader: require.resolve('less-loader'),
			        		options: {
			        			javascriptEnabled: true
			        		}
			        }
				]
			},
			{
		        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		        loader: 'url-loader',
		        options: {
		          limit: 10000,
		          name: utils.assetsPath('img/[name].[hash:7].[ext]')
		        }
		     },
		    	{
		    		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf)(\?.*)?$/,
		    		loader: 'url-loader',
		    		options: {
		    			limit: 10000,
		    			name: utils.assetsPath('media/[name].[hash:7].[ext]')
		    		}
		    	},
		    	{
		    		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		    		loader: 'url-loader',
		    		options: {
		    			limit: 10000,
		    			name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
		    		}
		    	}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true,
			chunks: ['start', 'vendor', 'manifest']
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		})
	].concat(entries.htmlPlugins)
}
