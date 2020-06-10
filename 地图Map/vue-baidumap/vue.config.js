/*
 * @Author: your name
 * @Date: 2020-06-08 09:31:49
 * @LastEditTime: 2020-06-09 17:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-baidumap\vue.config.js
 */
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        externals: {
            "BMap": "BMap",
        }
    }
}