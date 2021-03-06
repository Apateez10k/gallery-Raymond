const path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = [
  {
    plugins: [
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify('http://localhost:3002'),
        APIKEY: JSON.stringify('YOUR_API_KEY'),
      }),
    ],
    context: __dirname + '/client',
    entry: './server.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include : SRC_DIR,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          },
        },
        {
          test: /\.css$/,
          use: ['css-loader']
        }
      ],
    },
    output: {
      path: __dirname + '/public',
      filename: 'server.js',
      libraryTarget: 'commonjs',
    },
  },
  {
    plugins: [
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify('http://localhost:3002'),
        APIKEY: JSON.stringify('YOUR_API_KEY'),
      }),
    ],
    context: __dirname + '/client',
    entry: './client.jsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include : SRC_DIR,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
    output: {
      path: __dirname + '/public',
      filename: 'client.js',
    }
  },
];
