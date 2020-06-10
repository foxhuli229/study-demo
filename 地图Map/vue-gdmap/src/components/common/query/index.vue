<template>
  <div class="tool-query-box">
    <template v-if="queryRowNum > 1">
      <h2 v-if="title" class="title">{{ title }}</h2>
      <div v-for="count in queryRowNum" :key="count" class="tool-query-wrap">
        <slot name="tabs" />
        <slot :name="`form${count}`" />
        <template v-if="count === queryRowNum">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleQuery"
          >
            查询
          </el-button>
          <slot name="btn" />
        </template>
      </div>
    </template>
    <template v-else>
      <div class="tool-query-wrap">
        <div class="hd">
          <div>
            <slot name="tabs" />
            <h2 v-if="title" class="title">{{ title }}</h2>
          </div>
          <div>
            <span v-if="$slots.btn" class="tool-btns">
              <slot name="btn" />
            </span>
            <el-button
              v-if="$slots.form && $slots.btn"
              type="primary"
              size="mini"
              @click="handleSpread"
            >
              {{ show ? '收起' : '展开'}}
              <i class="el-icon--right" :class="{ 'el-icon-bottom': !show, 'el-icon-top': show }"></i>
            </el-button>
            <div v-if="!$slots.btn" class="form-box">
              <slot name="form" />
              <el-button
                v-if="$slots.form"
                icon="el-icon-search"
                type="primary"
                size="mini"
                @click="handleQuery"
              >
                查询
              </el-button>
            </div>
          </div>
        </div>
        <div v-if="$slots.btn" class="shrink-box" :class="{ 'hidden' : !show }">
          <div class="form-box">
            <slot name="form" />
            <el-button
              v-if="this.$slots.form"
              icon="el-icon-search"
              type="primary"
              size="mini"
              @click="handleQuery"
            >
              查询
            </el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    queryRowNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleQuery() {
      this.$emit('query-click')
    },
    handleSpread() {
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
  .tool-query-box {
    background: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      color: $default-text-color;
    }
    .tool-query-wrap {
      display: flex;
      flex-direction: column;
      min-height: 50px;
      line-height: 40px;
      .hd {
        width: 100%;
        min-height: 94px;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .tool-btns {
          margin-right: 10px;
          .el-button {
            background-color: #F1F9FF;
            border-color: $theme-color;
            color: $theme-color;
            &:hover {
              background-color: $theme-color;
              border-color: $theme-color;
              color: #fff;
            }
          }
        }
      }
      .shrink-box {
        max-height: 200px;
        overflow: hidden;
        transition: max-height .3s;
        &.hidden{
          max-height: 0;
        }
        .form-box {
          padding: 30px 0;
          border-top: 1px solid #EAEEF6;
        }
      }
      .form-box {
        width: 100%;
        & > *:not(.el-button) {
          margin-right: 10px
        }
      }
      & > p,
      & > span {
        font-size: 12px;
      }
      /deep/ .el-input,.el-select {
        width: 220px;
      }
       /deep/.el-date-editor {
        width: 160px;
        &.el-range-editor {
          width: 240px;
        }
      }
    }
  }
</style>
