var webpack = require('webpack');
var path = require('path');
// var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/'
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "public/index.html"),
    filename: "./index.html"
});
// const serviceWorkerPlugin = new ServiceWorkerWebpackPlugin({
//   entry: path.join(__dirname, 'src/serviceWorkder.js'),
//   excludes: [
//     '**/.*',
//     '**/*.map',
//     '*.html',
//   ],
//   filename: 'serviceWorkder.js'
// })
const CopyPlugin = require('copy-webpack-plugin');
const FilePlugin = new CopyPlugin([
  {from: 'public', to: '', exclude: 'public/index.html'}
])
module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.scss$/,
            use: [  'style-loader', 'css-loader','sass-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          use: {loader:'file-loader'}
        }
      ]
     
     
    },
    plugins: [htmlWebpackPlugin, FilePlugin,  new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
  })],
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '',
      filename: 'bundle.js'
    },
    devServer:{
      contentBase: "./build"
    }
  };