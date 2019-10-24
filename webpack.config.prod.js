var webpack = require('webpack');
var path = require('path');
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
        }
      ]
     
     
    },
    output: {
      path: path.resolve(__dirname, '/dist')
    }
  };