# VUE中 SVG封装



## 1. 安装依赖

```yaml
npm install --save-dev svg-sprite-loader
```



## 2. 将svg文件放入项目中

![avatar](https://ww1.sinaimg.cn/large/005YdosGly1g8u4iazslyj305s05d0sm.jpg)



## 3. vue-cli 2.x 配置

在 ```webpack.base.conf.js``` 中 配置允许svg依赖

```javascript
module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/components/icons/svg')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/components/icons/svg')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },
```



## 4. vue-cli 3.x配置

在 ```vue.config.js``` 中 配置允许svg依赖

```javascript
function resolve(dir) {
    return path.join(__dirname, dir)
}

chainWebpack: config => {
        // svg rule loader
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/components/icons/svg'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },
```



## 5. 在src/components 创建 icons 文件 创建 SvgIcon.vue文件

```javascript
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
     // width: 1em;
     // height: 1em;
      vertical-align: -0.15em;
      fill: currentColor; //此属性为更改svg颜色属性设置
      overflow: hidden;
  }
</style>
```



## 6.在 components/icons/svg 下创建index.js

```javascript
//其中 @指src目录

import Vue from 'vue'
import SvgIcon from './SvgIcon'
// 全局注册组件
Vue.component('svg-icon', SvgIcon)
// 定义一个加载目录的函数
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/components/icons/svg', false, /\.svg$/)
// 加载目录下的所有 svg 文件
requireAll(req)
```



## 7. 在 ```main.js``` 中引用svg

```javascript
import './components/icons/svg'
```



## 8. 使用 svg 组件

在需要引用的组件中直接可以使用，iconClass的值就是svg 文件的 文件名， className的值就是对于 Svg图标的样式类名

```javascript
//例：
<template>
  <div>
     <svg-icon iconClass='live' className='icon'></svg-icon>
  </div>
</template>

<script>
export default {
 
};
</script>
<style scoped>
.icon {
  width: 50px;
  height: 50px;
  color: blue;
}
</style>
```



在类名icon中设置需要的样式，包括颜色，svg的样式就会随之改变



注意：有时会出现改变颜色图标颜色不会发生改变的情况，这时打开svg文件，看下图：

![效果图](https://ww1.sinaimg.cn/large/005YdosGly1g8u5wd3xd9j30qp07bq34.jpg)



删除style标签里的每一项fill样式设置，这样就可以实现颜色自由切换了



## 9. 效果图

![效果图](https://ww1.sinaimg.cn/large/005YdosGly1g8u5w3wzrqj305704gwe9.jpg)