/*
 * @Author: your name
 * @Date: 2020-06-03 10:56:31
 * @LastEditTime: 2020-06-03 11:23:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-gdmap\src\api\user.js
 */ 
import request from '@/utils/request'
// import qs from 'qs'

export function login(data) {
  return request.service({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
