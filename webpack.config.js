var path = require('path');

var isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'react-numbers',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [ path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules') ],
        loader: 'babel'
      }
    ]
  },

  stats: {
    colors: true,
    reasons: isDebug,
    chunks: !isDebug
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  watch: isDebug,
};
