<template>
  <Dialog
    width="40%"
    title="修改密码"
    :visible="visible"
    @submit="submit"
    @cancel="handleClose"
  >
    <template #content>
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="top"
        size="mini"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="原密码"
              prop="oldPassword"
            >
              <el-input v-model="formData.oldPassword" :maxlength="10" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="新密码"
              prop="newPassword"
            >
              <el-input v-model="formData.newPassword" :maxlength="10" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              label="确认密码"
              prop="confirmPassword"
            >
              <el-input v-model="formData.confirmPassword" :maxlength="10" show-password />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </Dialog>
</template>

<script>
import { encrypt } from '@/utils/crypto.js'
export default {
  components: {
    Dialog: () => import('@/components/common/Dialog')
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{4,10}$/,
            message: '密码由4-10位英文字母或数字组成',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{4,10}$/,
            message: '密码由4-10位英文字母或数字组成',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{4,10}$/,
            message: '密码由4-10位英文字母或数字组成',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 检查新密码是否一致
          if (this.formData.newPassword !== this.formData.confirmPassword) {
            return this.$message({
              type: 'error',
              message: '新密码与确认密码不一致'
            })
          }
          const encryOldPassword = encrypt(this.formData.oldPassword, 'zvan').value
          const encryNewPassword = encrypt(this.formData.newPassword, 'zvan').value
          const encrywConfirmPassword = encrypt(this.formData.confirmPassword, 'zvan').value
          const data = {
            oldPassword: encryOldPassword,
            newPassword: encryNewPassword,
            confirmPassword: encrywConfirmPassword
          }
          this.$store.dispatch('user/updatePassword', data).then(() => {
            this.$message.success('修改成功，请重新登录！')
            this.$router.push('/login')
          }).catch(() => {
          })
        }
      })
    }
  }
}
</script>
