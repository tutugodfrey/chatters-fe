const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: debug ? 'inline-source-map' : false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
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
    inline: true,
    port: 3000,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: debug 
  ? [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    })
  ]
  : [
        // define NODE_ENV to remove unnecessary code
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
        // extract imported css into own file
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
          template: "./src/index.html"
        }),
        new CompressionPlugin({
          test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
          exclude: /(node_modules)/
        }),
        new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          ie8: true,
          safari10: true,
          sourceMap: true
        }
      })
    ]
  }
}
