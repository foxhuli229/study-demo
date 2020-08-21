import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

const convertData = (data, converter) => {
  if (converter && typeof converter === 'function') {
    if (data.hasOwnProperty('records')) {
      const res = {
        ...data,
        records: converter(data)
      }
      return res
    } else {
      return converter(data)
    }
  } else {
    return data
  }
}
const api = (url, method, param, converter, customConfig) => {
  if (customConfig) {
    if (customConfig.loading && customConfig.loading === false) {
      store.dispatch('app/disableGlobalLoading')
    }
  }
  if (method === 'get' || method === 'delete') {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        params: param
      })
        .then(res => {
          const data = convertData(res.data, converter)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  } else if (method === 'postForm') {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: param,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [
          (data) => {
            return qs.stringify(data)
          }
        ]
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        data: param
      })
        .then(res => {
          const data = convertData(res.data, converter)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const download = (url, method = 'get', param, customConfig) => {
  if (method === 'get') {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        params: param,
        responseType: 'blob'
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      service({
        method: method,
        url,
        data: param,
        responseType: 'blob'
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const SUCCESS_STATUS_CODE = 200
const SUCCESS_DATA_CODE = 200
const ERROR_TOKEN_DATA_CODE = ['403', '401', 9900]

let requestCount = 0
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    requestCount++
    if (store.getters['user/token']) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = store.getters['user/token']
    }
    if (config.url.indexOf('http') === -1 && config.url.indexOf('api') > -1) {
      const curProjectConfig = store.getters['app/appConfig']
      config.url = curProjectConfig && curProjectConfig.apiContext ? `${curProjectConfig.apiContext}${config.url}` : config.url
    }
    !store.getters.closeGlobalLoading && store.dispatch('app/showGlobalLoading')
    return config
  },
  error => {
    requestCount++
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    requestCount--
    requestCount === 0 && store.dispatch('app/hideGlobalLoading')
    store.getters.closeGlobalLoading && store.dispatch('app/enableGlobalLoading')
    // if the custom code is not 20000, it is judged as an error.
    if (ERROR_TOKEN_DATA_CODE.some(one => one === res.code)) {
      // to re-login
      MessageBox.confirm('登录已过期！您可以点击取消停留在此页，或者重新登录！', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    if (response.status !== SUCCESS_STATUS_CODE) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (res.code && res.code !== SUCCESS_DATA_CODE) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      return response
    }
  },
  error => {
    requestCount--
    requestCount === 0 && store.dispatch('app/hideGlobalLoading')
    store.getters.closeGlobalLoading && store.dispatch('app/enableGlobalLoading')
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      Message({
        message: '登录已过期！',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)
const getPublicPath = () => {
  const curProjectConfig = store.getters['app/appConfig']
  const publicPath = curProjectConfig.publicPath
  return publicPath
}
const getApiContext = () => {
  const curProjectConfig = store.getters['app/appConfig']
  const apiContext = curProjectConfig.apiContext
  return apiContext
}
export default {
  get: (url, param, customConfig) => api(url, 'get', param, customConfig),
  post: (url, param, customConfig) => api(url, 'post', param, customConfig),
  postForm: (url, param, customConfig) => api(url, 'postForm', param, customConfig),
  del: (url, param, customConfig) => api(url, 'delete', param, customConfig),
  put: (url, param, customConfig) => api(url, 'put', param, customConfig),
  getFile: (url, param, customConfig) => download(url, 'get', param, customConfig),
  postFile: (url, param, customConfig) => download(url, 'post', param, customConfig),
  olmapBaseUrl: () => getPublicPath(),
  getApiContext: () => getApiContext()
}
