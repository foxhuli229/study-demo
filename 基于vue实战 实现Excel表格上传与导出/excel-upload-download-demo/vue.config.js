/*
 * @Author: your name
 * @Date: 2020-05-17 02:07:57
 * @LastEditTime: 2020-05-17 09:33:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \基于vue实战 实现Excel表格上传与导出\excel-upload-download-demo\vue.config.js
 */ 

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
	devServer: {
		proxy: 'http://127.0.0.1:8080'
	}
}