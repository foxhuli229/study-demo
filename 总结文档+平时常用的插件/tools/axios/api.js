import request from '@/utils/http'
import qs from 'qs'


/**
 * 参考方法： 用户列表
 * @param {*} data 
 */
export function getuserquery(data) {
  return request({
    url: '/api/user/query/list',
    method: 'post',
    data
  })
}
