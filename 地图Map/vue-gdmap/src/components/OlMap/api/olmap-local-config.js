/*
 * @Author: your name
 * @Date: 2020-06-03 09:40:32
 * @LastEditTime: 2020-06-05 15:59:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-gdmap\src\components\OlMap\api\olmap-local-config.js
 */ 
import request from '@/utils/request'
/**
 * 读取本地配置参数
 * */
export default class OlMapLocalConfig {
  /* 拿本地配置参数*/
  static configOlMap = () => {
    // const configObject = request.get(`${request.olmapBaseUrl()}/static/olmap/olmap.json`).then(res => {
      const configObject = request.get('/static/olmap/olmap.json').then(res => {
      res[res.type].type = res.type
      res[res.type].olmapUrl = request.olmapBaseUrl()
      return res[res.type]
    })
    return configObject
  }
  /* 逆地理编码查询*/
  static searchAddressByPoint = (data) => {
    const configObject = request.get('https://api.tianditu.gov.cn/geocoder',
      {
        tk: data.key,
        type: 'geocode',
        postStr: `{'lon':'${data.longitude}','lat':'${data.latitude}','ver':2}`
      }).then(res => {
      return res
    })
    return configObject
  }
  /* 地理编码接口*/
  static searchPointByKeyWord = (data) => {
    const configObject = request.get('https://api.tianditu.gov.cn/geocoder',
      {
        tk: data.key,
        ds: { keyWord: data.keyWord }
      }).then(res => {
      return res
    })
    return configObject
  }
  /*
  *  行政区划服务 接口详情阐述 请查看天地图web服务api
  *  {"searchWord":"四川省","searchType":"1","needSubInfo":"false","needAll":"false","needPolygon":"true","needPre":"true"}
  *   searchType	否	string	查询关键字。	无默认值
  *   searchType	否	string	查询类型(0：根据code查询，1：根据名称。)。	0
  *   needSubInfo	否	boolean	是否需要下一级信息。	false
  *   needAll	否	boolean	是否需要所有子节点(包括孙子节点..)。	false
  *   needPolygon	否	boolean	是否需要行政区划范围。	false
  *   needPre	否	boolean	是否需要上一级所有信息。
  * */
  static searchAdministrative = (data) => {
    const configObject = request.get('http://api.tianditu.gov.cn/administrative',
      {
        tk: data.key,
        postStr: { searchWord: data.searchWord, searchType: data.searchType, needSubInfo: data.needSubInfo, needAll: data.needAll, needPolygon: data.needPolygon, needPre: data.needPre }
      }).then(res => {
      return res
    })
    return configObject
  }
  /* 天气查询 */
  static searchWeathers = (data) => {
    const configObject = request.get('https://map.tianditu.gov.cn/data/weathers', {
      gbcode: data.gbcode
    }).then(res => {
      return res
    })
    return configObject
  }
  /* 根据名称搜索*/
  static searchKeyWord = (data) => {
    const configObject = request.get('https://api.tianditu.gov.cn/search', {
      type: 'query',
      tk: data.key,
      postStr: `{"yingjiType":0,"sourceType":0,"keyWord":"${data.searchWord}","level":12,"mapBound":"101.21635,26.47918,101.87553,26.74776","queryType":1,"start":0,"count":10,"queryTerminal":10000}`
    }).then(res => {
      return res
    })
    return configObject
  }
}
