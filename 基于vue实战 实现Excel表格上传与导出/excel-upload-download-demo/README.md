# Excel文件上传与导出功能
> 本项目采用 vue-cli3脚手架搭建而成，实现Excel的文件上传并解析 与 导出.cvs 文件
>
> 本项目学习地址：https://www.bilibili.com/video/BV1RQ4y1A7vw?from=search&seid=15533260577051376510
>
> 课件地址：
>
> 《基于Vue实战Excel上传解析与导出》课件地址
>
> 链接: https://pan.baidu.com/s/1BOdvQbYIAP4gBfHp7COmDw 提取码: ubw2


## 所需依赖
``` yaml
yarn add less less-loader
yarn add axios qs
yarn add element-ui
vue add router
yarn add xlsx
```

## 开启服务端接口

```yaml
node server.js
```



## 解析Excel文件核心代码说明

```js
 //download.vue
 // 采集EXCEL数据- 文件发生改变的时候，on-change(upload插件)
    async handle(ev) {
      let file = ev.raw; //获取文件流
      if (!file) return;  //判断是否上传了文件

      this.show = false; //表格显示
      let loadingInstance = this.$loading({
        text: "小主，请您稍等片刻，奴家正在玩命处理中！",
        background: "rgba(0,0,0,.5)"
      });

      await delay(100); // 设置异步间隔延迟
      //读取FILE中的数据（变为JSON格式）
      let data = await readFile(file); // 把文件按照二进制进行读取到 data中
      let workbook = xlsx.read(data, { type: "binary" }), //采用xlsx依赖
      worksheet = workbook.Sheets[workbook.SheetNames[0]]; //读取工作簿为0的内容
     
      data = xlsx.utils.sheet_to_json(worksheet);  //利用 xlsx内置方法将数据转成 json格式

      //把读取出来的数据变为最后可以传递给服务器的数据（姓名：name  电话：phone）
      let arr = [];
      data.forEach(item => {
        let obj = {};
        for (let key in character) {
          //hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
          if (!character.hasOwnProperty(key)) break;
          let v = character[key], // 字段对应表
            text = v.text,
            type = v.type;
          v = item[text] || "";
          type === "string" ? (v = String(v)) : null;
          type === "number" ? (v = Number(v)) : null;
          obj[key] = v;
        }
        arr.push(obj); //存储到 arr数组中
      });

      await delay(100); // 设置异步间隔延迟
      // 展示到页面中
      this.show = true;
      this.tempData = arr;
      loadingInstance.close();
    },
```

然后将解析到的json文件，调用后端提交的接口，进行保存操作

## 保存解析的数据

```js
  // 提交数据给服务器
    async submit() {
      if (this.tempData.length <= 0) {
        this.$message({
          message: "小主，请您先选择EXCEL文件！",
          type: "warning",
          showClose: true
        });
        return;
      }

      this.disable = true;
      let loadingInstance = this.$loading({
        text: "小主，请您稍等片刻，奴家正在玩命处理中！",
        background: "rgba(0,0,0,.5)"
      });

      // 完成后处理的事情
      let complate = () => {
        this.$message({
          message: "小主，奴家已经帮您把数据上传了！",
          type: "success",
          showClose: true
        });
        this.show = false;
        this.disable = false;
        loadingInstance.close();
      };

      // 需要把数据一条条传递给服务器
      let n = 0;
      let send = async () => {
        if (n > this.tempData.length - 1) {
          // 都传递完了
          complate();
          return;
        }
        let body = this.tempData[n];
        let result = await createAPI(body);
        if (parseInt(result.code) === 0) {
          // 成功
          n++;
        }
        send();
      };
      send();
    }
```



## 文件下载

```js
 // 导出数据
    submit() {
      if (this.selectionList.length <= 0) {
        this.$message({
          message: "小主，请您先选择要导出的数据哦！",
          type: "warning",
          showClose: true
        });
        return;
      }

      this.disabled = true;
      let loadingInstance = this.$loading({
        text: "小主，请您稍等片刻，奴家正在玩命处理中...",
        background: "rgba(0,0,0,.5)"
      });
	
       //选择需要导出的 字段
      let arr = this.selectionList.map(item => {
        return {
          编号: item.id,
          姓名: item.name,
          电话: item.phone
        };
      });
      let sheet = xslx.utils.json_to_sheet(arr), //利用xlsx依赖，将json数据转换成 sheet格式
        book = xslx.utils.book_new();
      xslx.utils.book_append_sheet(book, sheet, "sheet1");
      xslx.writeFile(book, `user${new Date().getTime()}.xls`);

      loadingInstance.close();
      this.disabled = false;
    }
  },
```

## 依赖utils 工具

```js
// 设置异步间隔延迟
export function delay(interval = 0) {
	return new Promise(resolve => {
		let timer = setTimeout(_ => {
			clearTimeout(timer);
			resolve();
		}, interval);
	});
};

// 把文件按照二进制进行读取
export function readFile(file) {
	return new Promise(resolve => {
		let reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = ev => {
			resolve(ev.target.result);
		};
	});
}

// 字段对应表
export let character = {
	name: {
		text: "姓名",
		type: 'string'
	},
	phone: {
		text: "电话",
		type: 'string'
	}
};

```



