<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="登录"
      left-arrow
      @click-left="btnBackPage"
    >
      <template #left> <van-icon name="cross" /> </template
    ></van-nav-bar>
    <!-- 手机号/验证码表单 -->
    <van-form ref="form" class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="mobileLogin"
      >
        <template #label><span class="toutiao tt-shouji"></span></template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="验证码"
        :rules="codeLogin"
      >
        <template #label><span class="toutiao tt-yanzhengma"></span></template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            :time="3 * 1000"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
            format="sss"
            class="code-btn"
            size="mini"
            round
          />
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入api

import { login, sendCode } from '@/api/user'
// 导入校验
import { mobileLogin, codeLogin } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileLogin,
      codeLogin,
      isShowCountDown: false,
      form: false
    }
  },
  methods: {
    // 返回之前的页面
    btnBackPage() {
      this.$router.back()
    },
    // 登录
    async login() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
        // loadingType: 'spinner'
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res.data)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        const status = error.response.status
        // console.log(status)
        if (status === 400) {
          this.$toast.fail(error.response.data.message)
        } else if (status === 507) {
          this.$toast.fail('登录错误，请刷新')
        } else {
          this.$toast.fail('登录错误，请刷新')
        }
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        // 验证手机号
        await this.$refs.form.validate('mobile')
        // 发送请求
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (error) {
        console.log(error)
        // 表单校验失败
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 验证码导致的失败
          const status = error.response.status
          if (status === 426 || status === 404) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 自定义导航栏
.navbar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  /deep/.van-field__label {
    flex: 1;
  }
  /deep/.van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
