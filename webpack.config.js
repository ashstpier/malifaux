var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/main.js',
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }, {
      test: /\.css?$/,
      loaders: [ 'style', 'raw' ],
      include: path.join(__dirname, 'styles')
    }
    ],
    resolve: {
      root: path.resolve(__dirname + "/src")
    }
  }
}
