const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js',
    vendor: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    /** CommonsChunkPlugin已经被webpack 4 废弃 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunks: ['pageA', 'pageB']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'mainfest'],
      minChunks: Infinity
    })
  ],
}