/*
 * @Author: your name
 * @Date: 2020-05-17 16:54:46
 * @LastEditTime: 2020-05-17 17:16:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-demo\webpack-demo\src\main.js
 */ 
const aa = require('./aa');
 
console.log("我是main.js");

const $ = require('jquery');

$(function() {
    $("#app li:nth-child(odd)").css("color", "red")
    $("#app li:nth-child(even)").css("color", "green")
})