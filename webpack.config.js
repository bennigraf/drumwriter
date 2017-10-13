const path = require('path');

module.exports = {
  entry: './app/src/js/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'app/dist')
  }
};