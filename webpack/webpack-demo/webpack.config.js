/*
 * @Author: your name
 * @Date: 2020-05-17 16:52:44
 * @LastEditTime: 2020-05-17 17:35:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit:
 * @FilePath: \study-demo\webpack-demo\webpack.config.js
 */ 
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