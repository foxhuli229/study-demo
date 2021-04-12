
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    //production：产品模式，去除注释，空格，换行
    //development：开发模式，保留注释，空格，换行
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}