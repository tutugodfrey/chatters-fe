const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /ndoe_modules/,
        use: ['style-loader', 'css-loader?url=false', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg)$/,
        exclude: /ndoe_modules/,
        use: {
          loader:'url-loader',
          options: {
            limit: 9000
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    })
  ]
}
