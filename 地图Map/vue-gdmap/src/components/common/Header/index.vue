<template>
  <el-header class="header" :height="variables.headerHeight">
    <div class="container left">
      <img v-if="logoUrl !== ''" class="logo" :src="logoUrl" alt="">
      <h1 class="title"> {{ title }}</h1>
      <slot name="left" />
    </div>
    <div class="container right">
      <div class="cur-date">{{ currentDate }}</div>
      <div v-if="showFristScreenBtn" class="back-home" @click="goFirstScreen">返回首页</div>
      <slot name="right" />
      <el-dropdown class="user-dropdown" @command="handleUsername">
        <span class="el-dropdown-link">
          <img :src="avatarUrl" alt="">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <slot name="dropdown" />
          <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <UpdatePsswordDialog v-if="visible" :visible.sync="visible" />
  </el-header>
</template>
<script>
import vars from '@/styles/vars.scss'
import moment from 'moment'
export default {
  components: {
    UpdatePsswordDialog: () => import('./components/updatePsswordDialog')
  },
  props: {
    logoUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: 'admin'
    },
    showFristScreenBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      currentDate: null
    }
  },
  computed: {
    variables() {
      return vars
    }
  },
  created() {
    this.curDate()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    curDate() {
      this.currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.interval = setInterval(() => {
        this.currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },
    handleUsername(command) {
      switch (command) {
        case 'updatePassword':
          this.visible = true
          break
        case 'logout':
          this.logout()
          break
        default:
          this.$emit('command', command)
      }
    },
    async logout() {
      await this.$store.dispatch('user/resetToken')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    goFirstScreen() {
      this.$router.push('/first-screen')
    }
  }
}
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    background: $header-background-color;
    color: $header-text-color;
    font-size: $header-text-size;
    .container {
      display: flex;
      align-items: center
    }
    .left {
      .logo {
        width: $header-logo-width;
      }
      .title {
        font-size: $header-title-size;
        margin: 0 10px;
        color: $header-title-color;
        font-weight: $header-title-weight;
      }
    }
    .right {
      justify-content: flex-end;
      .cur-date {
        font-size: 12px;
      }
      .back-home {
        background: url('~@/assets/common/back_home.png') left center no-repeat;
        background-size: 14px 14px;
        padding-left: 18px;
        cursor: pointer;
      }
      > * + * {
        margin-left: 20px
      }
      .user-dropdown {
        color: $header-text-color;
        font-size: $header-text-size;
      }
    }
  }
</style>
