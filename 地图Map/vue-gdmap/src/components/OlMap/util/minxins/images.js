/**
 *  图片定位
 * */
export default {
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    }
  },
  methods: {
    getImgaeUrl(item) {
      const olmapUrl = this.configObj.olmapUrl
      let url, image
      const type = item.pointType
      switch (type) {
        case '1':
          image = `/static/olmap/images/thematic-layer/重大风险源.png`
          url = `url(${olmapUrl}${image})`
          break
        case '2':
          image = `/static/olmap/images/thematic-layer/一般风险源企业.png`
          url = `url(${olmapUrl}${image})`
          break
        case '3':
          image = `/static/olmap/images/thematic-layer/空气监测站.png`
          url = `url(${olmapUrl}${image})`
          break
        case '4':
          image = `/static/olmap/images/thematic-layer/生态保护区.png`
          url = `url(${olmapUrl}${image})`
          break
        case '5':
          image = `/static/olmap/images/thematic-layer/文化教育.png`
          url = `url(${olmapUrl}${image})`
          break
        case '6':
          image = `/static/olmap/images/thematic-layer/居民生活.png`
          url = `url(${olmapUrl}${image})`
          break
        case '7':
          image = `/static/olmap/images/thematic-layer/医疗卫生.png`
          url = `url(${olmapUrl}${image})`
          break
        case '8':
          image = `/static/olmap/images/thematic-layer/机关单位.png`
          url = `url(${olmapUrl}${image})`
          break
        case '9':
          image = `/static/olmap/images/one-picture-control/正常污染源.png`
          url = `url(${olmapUrl}${image})`
          break
        case '10':
          image = `/static/olmap/images/one-picture-control/异常污染源.png`
          url = `url(${olmapUrl}${image})`
          break
        default:
          image = `/static/olmap/images/red.png`
          url = `url(${olmapUrl}${image})`
      }
      return {
        backUrl: url,
        image: image
      }
    }
  }
}
