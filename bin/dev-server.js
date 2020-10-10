'use strict'

const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, '../web'),
    historyApiFallback: true, 
    port: 8000,
    publicPath: "/"
});
server.listen(8000, 'localhost', function (err) {
    if (err) throw err
})