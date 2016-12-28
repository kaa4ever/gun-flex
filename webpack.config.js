var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    'lib/gun-flex': "./src/index",
    'example/script': "./example/script"
  },
  output: {
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'example')],
        loader: 'babel-loader'
      }
    ]
  }
};