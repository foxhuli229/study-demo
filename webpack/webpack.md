# webpack学习文档

> 学习文档：[使用webpack定制前端开发环境](https://www.kancloud.cn/sllyli/webpack/1242347)

[TOC]

## webpack的概念和基础使用

使用webpack前，需要安装webpack的对应依赖

```bash
npm install webpack webpack-cli
```

**入口**

在多个代码模块中会有一个起始的 `.js` 文件，这个便是 webpack 构建的入口。webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。如图，一开始我们使用 webpack 构建时，默认的入口文件就是 `./src/index.js`。

我们常见的项目中，如果是单页面应用，那么可能入口只有一个；如果是多个页面的项目，那么经常是一个页面会对应一个构建入口。

入口可以使用 `entry` 字段来进行配置，webpack 支持配置多个入口来进行构建：

```js
module.exports = {
  entry: './src/index.js' 
}

// 上述配置等同于
module.exports = {
  entry: {
    main: './src/index.js'
  }
}

// 或者配置多个入口
module.exports = {
  entry: {
    foo: './src/page-foo.js',
    bar: './src/page-bar.js', 
    // ...
  }
}

// 使用数组来对多个文件进行打包
module.exports = {
  entry: {
    main: [
      './src/foo.js',
      './src/bar.js'
    ]
  }
}
```

**babel-loader**



js 的压缩插件： [uglifyjs-webpack-plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)

定义环境变量的 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)

生成 CSS 文件的 [ExtractTextWebpackPlugin](https://webpack.js.org/plugins/extract-text-webpack-plugin/) 

## 2. webpack学习总结
> 参考文档: https://www.bilibili.com/video/BV1e7411j7T5?p=3

