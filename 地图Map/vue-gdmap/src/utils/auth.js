/*
 * @Author: your name
 * @Date: 2020-04-29 17:23:28
 * @LastEditTime: 2020-05-19 10:56:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ZCY.Platform.PlatformManagementWeb\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'zcy_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
