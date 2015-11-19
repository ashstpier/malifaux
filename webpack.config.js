var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname + "/src/main.js"),
  ],
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      }
    ],
    resolve: {
      root: path.resolve(__dirname + "/src")
    }
  }
}
