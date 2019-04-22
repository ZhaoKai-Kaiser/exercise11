const path = require('path')
// Since webpack 4 the "extract-text-webpack-plugin" should not be used for css.
// Use "mini-css-extract-plugin" instead
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
// 这个在 npm run dev 和 npm run build 时候是不同的
const TARGET = process.env.npm_lifecycle_event
const APP_PATH = path.join(__dirname, '/src')
const dist = path.resolve(__dirname, 'dist')
const common = {
  entry: `${APP_PATH}/index.js`,
  output: {
    path: dist,
    filename: 'index.js'
  }
}

let other = {}

if (TARGET === 'dev') {
  other = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader']
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({ template: `${APP_PATH}/index.html` })]
  }
}

if (TARGET === 'build') {
  console.log('就是这里')
  other = {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: MiniCssExtractPlugin.loader,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: `${APP_PATH}/index.html` }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
}

const output = merge(common, other)

console.log('----------------------------')
console.log(output)
console.log('----------------------------')

module.exports = output
