const path = require('path');

module.exports = {
  devtool: `eval-source-map`,
  mode: 'development',
  entry: path.join(__dirname, `/client/entry.jsx`),
  output: {
    path: path.resolve(__dirname, 'public', 'bundle'),
    filename: 'bundle.js'
  },
  module: {
   rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};