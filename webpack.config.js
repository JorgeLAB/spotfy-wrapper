const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules:[
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  }
};
