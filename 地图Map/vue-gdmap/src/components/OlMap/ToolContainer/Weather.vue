<template>
  <div v-if="weather.SHOW" class="weather-item">
    <div :title="weather.weatherText" :style="wicon" class="weather-icon" :class="weather.iconPosition" />
  </div>
</template>
<script>
import OlMapLocalConfig from '@/components/OlMap/api/olmap-local-config.js'
export default {
  data() {
    return {
      weather: {
        iconPosition: 0,
        weatherText: '',
        SHOW: true
      }
    }
  },
  computed: {
    configObj() {
      return this.$store.state.olmap.configObj
    },
    wicon() {
      const olmapUrl = this.configObj.olmapUrl
      const wicon = `background-image: url('${olmapUrl}/static/olmap/images/wicon.png')`
      return wicon
    },
    currentCity() {
      return this.$store.state.olmap.currentCity
    }
  },
  watch: {
    currentCity: {
      handler() {
        this.fetchWeatherData()
      },
      deep: true
    }
  },
  mounted() {
    this.fetchWeatherData()
  },
  methods: {
    fetchWeatherData() {
      const _this = this
      const gbcode = this.currentCity.GB
      OlMapLocalConfig.searchWeathers({
        gbcode: gbcode
      }).then(function(response) {
        const currentdata = response && response.currentdata
        if (currentdata && currentdata.length > 0) {
          const cd = currentdata[0]
          // 图标
          const ic = cd.ic[0]
          // 天气
          const fa = cd.dw[0].fa
          // 温度
          // var tmp = cd.dw[0].tmp
          _this.weather.iconPosition = ic
          _this.weather.weatherText = fa
          _this.weather.SHOW = true
        } else {
          _this.weather.SHOW = false
        }
      })

      const currentCityObj = Object.assign(this.currentCity, _this.weather)
      this.$store.dispatch('olmap/changeCurrentCity', currentCityObj)
    }
  }
}
</script>
<style lang="scss">
  .weather-icon{
    background-repeat: no-repeat;
    height: 21px;
    width: 21px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 6px;
    margin-top: 5px;
  }
  .weather-icon:hover{
    cursor: pointer;
  }
  .weather-icon.d16 {
    background-position: 0px 0px ;
  }

  .weather-icon.d00 {
    background-position:-30px 0px ;
  }

  .weather-icon.d02 {
    background-position:-60px 0px ;
    _margin-left: -64px;}

  .weather-icon.d03 {
    background-position:-90px 0px ;
  }

  .weather-icon.d04 {
    background-position:-120px 0px ;
  }

  .weather-icon.d05 {
    background-position:-150px 0px ;
  }

  .weather-icon.d06 {
    background-position:-180px 0px ;
  }

  .weather-icon.d07 {
    background-position:-210px 0px ;
  }

  .weather-icon.d08 {
    background-position:-240px 0px ;
  }

  .weather-icon.d09 {
    background-position:-270px 0px ;
  }

  .weather-icon.d10 {
    background-position:0px -29px ;
  }

  .weather-icon.d11 {
    background-position:-30px -29px ;
  }
  .weather-icon.d12 {
    background-position:-60px -29px ;
  }
  .weather-icon.d13 {
    background-position:-90px -29px ;
  }
  .weather-icon.d14 {
    background-position:-120px -29px ;
  }
  .weather-icon.d15 {
    background-position:-150px -29px ;
  }
  .weather-icon.d01 {
    background-position:-180px -29px;
  }
  .weather-icon.d17 {
    background-position:-210px -29px ;
  }
  .weather-icon.d18 {
    background-position:-240px -29px ;
  }

  .weather-icon.d19 {
    background-position:-270px -29px ;
  }

  .weather-icon.d20 {
    background-position:0px -59px ;
  }

  .weather-icon.d21 {
    background-position:-30px -59px ;
  }

  .weather-icon.d22 {
    background-position:-60px -59px ;
  }

  .weather-icon.d23 {
    background-position:-90px -59px ;
  }

  .weather-icon.d24 {
    background-position:-120px -59px ;
  }

  .weather-icon.d25 {
    background-position:-150px -59px ;
  }

  .weather-icon.d26 {
    background-position:-180px -59px ;
  }

  .weather-icon.d27 {
    background-position:-210px -59px ;
  }

  .weather-icon.d28 {
    background-position:-240px -59px ;
  }

  .weather-icon.d29 {
    background-position:-270px -59px ;
  }

  .weather-icon.d30 {
    background-position:0px -90px ;
  }
  .weather-icon.d31 {
    background-position:-30px -90px ;
  }
  .weather-icon.d53 {
    background-position:-60px -90px ;
  }

  .weather-icon.n15 {
    background-position: 0px -120px;
  }

  .weather-icon.n53 {
    background-position: -30px -120px;
  }

  .weather-icon.n01 {
    background-position: -60px -120px;
  }

  .weather-icon.n02 {
    background-position: -90px -120px;
  }

  .weather-icon.n03 {
    background-position: -120px -120px;
  }

  .weather-icon.n04 {
    background-position: -150px -120px;
  }

  .weather-icon.n05 {
    background-position: -180px -120px;
  }

  .weather-icon.n06 {
    background-position: -210px -120px;
  }

  .weather-icon.n07 {
    background-position: -240px -120px;}

  .weather-icon.n08 {
    background-position: -270px -120px;
  }

  .weather-icon.n09 {
    background-position: 0px -151px;
  }

  .weather-icon.n10 {
    background-position: -30px -151px;
  }

  .weather-icon.n11 {
    background-position: -60px -151px;
  }

  .weather-icon.n12 {
    background-position: -90px -151px;
  }

  .weather-icon.n13 {
    background-position: -120px -151px;
  }

  .weather-icon.n14 {
    background-position: -150px -151px;
  }

  .weather-icon.n00 {
    background-position: -180px -151px;
  }

  .weather-icon.n16 {
    background-position: -210px -151px;
  }

  .weather-icon.n17 {
    background-position: -240px -151px;}

  .weather-icon.n18 {
    background-position: -270px -151px;
  }

  .weather-icon.n19 {
    background-position: 0px -181px;
  }

  .weather-icon.n20 {
    background-position: -30px -181px;
  }

  .weather-icon.n21 {
    background-position: -60px -181px;
  }

  .weather-icon.n22 {
    background-position: -90px -181px;
  }

  .weather-icon.n23 {
    background-position: -120px -181px;
  }

  .weather-icon.n24 {
    background-position: -150px -181px;
  }

  .weather-icon.n25 {
    background-position: -180px -181px;
  }

  .weather-icon.n26 {
    background-position: -210px -181px;
  }

  .weather-icon.n27 {
    background-position: -240px -181px;
  }

  .weather-icon.n28 {
    background-position: -270px -181px;
  }

  .weather-icon.n29 {
    background-position: 0px -212px;
  }

  .weather-icon.n30 {
    background-position: -30px -212px;
  }

  .weather-icon.n31 {
    background-position: -60px -212px;
  }
</style>
