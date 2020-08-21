/*
 * @Author: your name
 * @Date: 2020-06-03 14:54:05
 * @LastEditTime: 2020-06-05 08:47:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-openlayers\vue.config.js
 */ 

 module.exports = {
     lintOnSave: false,
     chainWebpack:config => {
        config.optimization.minimize(false);
    },
 }