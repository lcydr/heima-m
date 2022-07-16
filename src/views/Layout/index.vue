<template>
  <div>
    <router-view />

    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/ "
        ><template #icon>
          <span class="toutiao tt-shouye"></span>
          <span class="text">首页</span>
        </template></van-tabbar-item
      >

      <van-tabbar-item icon="home-o" to="/video"
        ><template #icon>
          <span class="toutiao tt-shipin"></span>
          <span class="text">视频</span>
        </template></van-tabbar-item
      >

      <van-tabbar-item icon="home-o" to="/qa"
        ><template #icon>
          <span class="toutiao tt-wenda"></span>
          <span class="text">问答</span>
        </template></van-tabbar-item
      >

      <van-tabbar-item icon="home-o" to="profile"
        ><template #icon>
          <span class="toutiao tt-wode"></span>
          <span class="text">{{
            $store.state.user.token ? '我的' : '未登录'
          }}</span>
        </template></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabbar-item__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  .toutiao {
    font-size: 0.53333rem;
  }
  .text {
    font-size: 0.32rem;
  }
}
</style>
