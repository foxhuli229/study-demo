<!--
 * @Author: your name
 * @Date: 2020-05-16 00:31:42
 * @LastEditTime: 2020-05-17 09:21:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \基于vue实战 实现Excel表格上传与导出\excel-upload-download-demo\src\views\index.vue
-->
<template>
  <div class="content">
    <div class="title">
      <el-input
        style="width: 200px; margin-right: 20px;"
        size="small"
        placeholder="请输入内容"
        v-model.trim="search"
        @keyup.enter.native="handleSeach"
        clearable
      >
        <i class="el-icon-search"></i>
      </el-input>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-search"
        @click="handleSeach"
        >搜索</el-button
      >
      <el-button type="primary" size="small" @click="dowloadData"
        >导出要选中的数据</el-button
      >
      <el-button
        class="right-btn"
        type="primary"
        icon="el-icon-edit"
      ></el-button>
    </div>

    <div class="table">
      <el-table
        stripe
        ref="multipleTable"
        v-loading="loading"
        height="calc(100% - 60px)"
        max-height:="calc(100% - 60px)"
        tooltip-effect="dark"
        :data="formatData"
        @selection-change="selectDataMet"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          align="center"
          label="序列号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column align="center" label="日期">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      class="pages"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ETable",
  data() {
    return {
      search: "",
      total: 0,
      list: [],
      currentPage: 1, //当前页
      pageSize: 10, //每页显示的条数
      loading: true,
      formatData: [],
      selectData: [], //选中的数据
    };
  },
  mounted() {
    this.getlist();
  },
  watch: {
    formatData() {
      let startNum = (this.currentPage - 1) * this.pageSize;
      let endNum = startNum + this.pageSize;
      return this.list.slice(startNum, endNum);
    },
    search(newVal) {
      if (newVal == "") {
        this.formatData = this.list;
      } else {
        this.formatData = this.list.filter((data) =>
          data.name.includes(this.search)
        );
      }
      this.total = this.formatData.length;
    },
  },
  methods: {
    getlist() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "/static/list.json",
      })
        .then((res) => {
          res = res.data;
          if (res.code === 200) {
            this.list = res.data || [];
            this.formatData = res.data || [];
            this.total = res.data.length;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },

    //搜索
    handleSeach() {
      this.currentPage = 1;
      this.formatData = this.list.filter((data) =>
        data.name.includes(this.search)
      );
      this.total = this.formatData.length;
    },

    //每页条数改变时触发
    handleSizeChange(pagesize) {
      this.pageSize = pagesize;
    },
    //页码切换
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //select发送改变的时候
    selectDataMet(data) {
      console.log(data);
      this.selectData = data;
    },
    //导出选中的数据
    dowloadData() {
      this.$message({
        message: "选中的数据为：" + JSON.toString(this.selectData),
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.content {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.content .title {
  margin: 20px 0;
}
.content .right-btn {
  float: right;
  right: 20px;
  padding: 10px;
  border-radius: 50%;
}
.content .table {
  overflow-y: auto;
  height: 80vh;
}
.content .pages {
  position: fixed;
  box-sizing: border-box;
  height: 50px;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border-top: 1px solid #cccccc;
  text-align: right;
}
.content >>> .el-button--small {
  padding: 8px 20px;
}
</style>
