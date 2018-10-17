const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './demo/index.js',
  mode: 'development',
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, 'docs/demo')
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: './index.html',
      template: 'demo/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'demo/static', to: 'static' },
    ], {})
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
