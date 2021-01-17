const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 用于在内存中生成html

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})

module.exports = {
  mode: 'development', // development production
  plugins: [
    htmlPlugin
  ],
  module: {
    rules: [
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}