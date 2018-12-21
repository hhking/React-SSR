const webpack = require('webpack');
const dev = process.env.NODE_ENV != "production";
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const plugins = [
  new webpack.HashedModuleIdsPlugin(),
  new FriendlyErrorsWebpackPlugin(),
];

module.exports = {
  mode: dev ? "development" : "production",
  devtool: "source-map",
  entry: {
    app: "./client/client.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      "node_modules",
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }]
  },
  plugins,
}