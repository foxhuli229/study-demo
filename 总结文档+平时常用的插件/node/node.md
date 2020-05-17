# Nodejs

## Nodejs 预习课程

**1.common.js 规范**
  - 自定义模块
    - 导入：require()。 例： require("http")
    - 导出： module.exports 或者 exports; 
    - node_modules里面的 package.json配置
    - node_modules 查找规则：向上查找
  - 


## Nodejs(一)

### 1.dependencies：运行模块（安装在运行模块内的所有依赖，在开发内和运行内均需要使用）   

安装命令: 
```yaml
npm install axios --save
或
yarn add axios
```

### 2.devDependencies：开发模块（安装的依赖只需在开发时候才需要的，运行版本不需要的依赖，则可以安装在此目录中，例如：sass，less）
安装命令: 
```yaml
npm install axios -D
```

### 3.利用命令生成 package.json
``` yaml
npm init -y //所有的选择默认为 Y
```

### 4.查看 全局node安装目录

```yaml
npm root -g
```

### 5.查看npm下载地址

```yaml
npm config list
```

### 6.更改npm下载源地址

```yaml
npm config set registry https://registry.npmjs.org
```

### 7.在npm发布包
```yaml
npm publish
```


### 8.删除发布的包(删除24小时候，不能重新用该名称)
```yaml
npm unpublish --force
```

### 9.NVM 版本切换 （nvm 和 gnvm有啥区别。）
```yaml
nvm --version //查看nvm版本
```

### 10.查看历史安装过node的历史版本
```yaml
nvm ls
```

### 11.查看远端（官网）的node最新版本
```yaml
nvm ls-remote //远端 查看远端node版本

nvm install 12.10.0(版本号) //安装 12.10.0的版本
nvue use 8.11.4 // 切换版本为8.11.4
```

### 12.包管理器（nvm）
