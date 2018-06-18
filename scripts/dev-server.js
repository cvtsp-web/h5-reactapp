var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')

var app = express()
var PORT = process.env.PORT || 9090
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware-hard-disk')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
})

app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

app.listen(PORT, function() {
	console.log('server is start at:' + PORT)
})
