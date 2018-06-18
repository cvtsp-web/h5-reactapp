var path = require('path')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 静态文件路径 static 
 */
exports.assetsPath = function(_path) {
	return path.posix.join('static', _path);
}

exports.resolve = function(dir) {
	return path.join(__dirname, '..', dir)
}

exports.cssLoaders = function(options) {
	options = options || {};
	
	var cssLoader = {
		loader: 'css-loader',
		options: {
			minimize: process.env.NODE_ENV === 'production',
			sourceMap: options.sourceMap
		}
	}
	
	function generateLoaders(loader, loaderOptions) {
		var loaders = [cssLoader];
		if(loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}
		return loaders;
	}
	
	return {
		css: generateLoaders(),
		postcss: generateLoaders('postcss'),
		less: generateLoaders('less'),
		sass: generateLoaders('sass'),
		scss: generateLoaders('scss')
	}
}

exports.styleLoaders = function(options) {
	var output = [];
	var loaders = exports.cssLoaders(options);
	
	for(var extension in loaders) {
		var loader = loaders[extension];
		// /\.js?$/
		output.push({
			test: new RegExp('\\.'+extension+'$'),
			use: loader
		});
	}
	return output;
}

exports.getEntries = function(globPath) {
	var entry = {}, htmlPlugins = [];
	glob.sync(globPath).forEach(function(name) {
		var dirname = path.dirname(name);
		var n = path.basename(dirname);
		entry[n] = name;
	});
	
	Object.keys(entry).forEach(function(name) {
		var plugin = new HtmlWebpackPlugin({
			filename: name + '.html',
			template: path.resolve(process.cwd(), 'index.html'),
			inject: true,
			chunks: [name, 'vendor', 'manifest']
		});
		htmlPlugins.push(plugin);
	})
	return {
		entry: entry,
		htmlPlugins: htmlPlugins
	};
}
