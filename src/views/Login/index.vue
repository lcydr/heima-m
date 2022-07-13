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
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label><span class="toutiao tt-shouji"></span></template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label><span class="toutiao tt-yanzhengma"></span></template>
        <template #right-icon
          ><van-button class="code-btn" size="mini" round
            >发送验证码</van-button
          ></template
        >
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入api
import { login } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回之前的页面
    btnBackPage() {
      this.$router.back()
    },
    // 登录
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
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
