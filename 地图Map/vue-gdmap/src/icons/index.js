/*
 * @Author: your name
 * @Date: 2020-06-05 16:42:25
 * @LastEditTime: 2020-06-08 08:55:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \地图Map\vue-gdmap\src\icons\index.js 
 */ 
import Vue from 'vue'
import SvgIcon from '@/components/common/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
