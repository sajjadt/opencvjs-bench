const path = require('path');

module.exports = {
  entry: './src/benchmark.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.bundle.js',
    library: 'benchmark',
    libraryTarget: 'umd'
  },
  node: {
    fs: "empty"
  }
};
