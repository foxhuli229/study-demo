/*
 * @Author: your name
 * @Date: 2020-04-29 17:23:28
 * @LastEditTime: 2020-05-08 10:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ZCY.Platform.PlatformManagementWeb\src\utils\validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 用户名验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 *密码验证
 *
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatePassword (rule, value, callback) {
  if (value.length < 0) {
    callback(new Error("密码长度必须大于6位"));
  } else {
    callback();
  }
};
