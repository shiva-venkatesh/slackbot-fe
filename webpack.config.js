const path = require('path');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './public/webpack/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer : {
  historyApiFallback: true,
  disableHostCheck: true,
  inline: true,
  port: 3232,
  host: '0.0.0.0', // For Docker users
  stats: {
    chunks: false,
    chunkModules: false,
    warnings: false
  }
},
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }]

  }
};