
import $ from  jQuery

const aa = require('./aa');
 
console.log("我是main.js");

const $ = require('jquery');

$(function() {
    $("#app li:nth-child(odd)").css("color", "red")
    $("#app li:nth-child(even)").css("color", "green")
})