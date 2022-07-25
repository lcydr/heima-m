<template>
  <div>
    <div class="top">
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <!-- 导航栏 -->
      <input type="file" hidden ref="file" @change="onFileChange" />
      <!-- 个人信息 -->
      <van-cell is-link title="头像" @click="$refs.file.click()"
        ><van-image width="30px" height="30px" round :src="profileArr.photo" />
      </van-cell>
      <van-popup v-model="shows" position="bottom" style="height: 100%"
        ><photo
          v-if="shows"
          :photos="photos"
          @cancel="shows = false"
          @updatePhoto="profileArr.photo = $event"
        ></photo
      ></van-popup>
    </div>
    <div>
      <van-cell is-link @click="showPopup" title="昵称">{{
        profileArr.name
      }}</van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '100%' }"
        ><van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="qvxiao"
          @click-right="onClickRight" /><van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
      /></van-popup>
    </div>
    <!-- 性别 -->
    <div>
      <van-cell
        is-link
        @click="showPopup1"
        title="性别"
        :value="profileArr.gender === 0 ? '男' : '女'"
      ></van-cell>
      <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          :default-index="profileArr.gender"
      /></van-popup>
    </div>
    <div>
      <van-cell is-link @click="showPopup2" title="生日">{{
        profileArr.birthday
      }}</van-cell>
      <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }"
        ><van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="qvxiaodata"
          @confirm="currentData"
      /></van-popup>
    </div>
  </div>
</template>

<script>
import photo from '@/views/user/photo/index.vue'
// import { Toast } from 'vant' editPhoto
import { profile, editProfile, formatDate } from '@/api/user'
export default {
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      profileArr: [],
      message: '',
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      columns: ['男', '女'],
      shows: false,
      photos: null
    }
  },
  created() {
    this.profile()
    // this.editProfile()
  },
  methods: {
    // 获取用户信息
    async profile() {
      try {
        const res = await profile()
        console.log(res)
        this.profileArr = res.data.data
        console.log(this.profileArr)
        this.message = this.profileArr.name
      } catch (error) {}
    },
    // async editProfile() {
    //   const data = await editProfile()
    //   console.log(data)
    // },
    showPopup() {
      this.show = true
    },
    showPopup1() {
      this.show1 = true
    },
    showPopup2() {
      this.show2 = true
      this.currentDate = new Date(this.profileArr.birthday)
    },
    qvxiaodata() {
      this.show2 = false
    },
    async currentData() {
      try {
        await editProfile({
          birthday: formatDate(this.currentDate)
        })
        this.profileArr.birthday = formatDate(this.currentDate)
        this.show2 = false
      } catch (error) {}
    },
    onClickLeft() {
      this.$router.back()
    },
    qvxiao() {
      this.show = false
    },
    // 修改昵称
    async onClickRight() {
      try {
        const res = await editProfile({ name: this.message })
        console.log(res)
        // res.data.data = this.message
        this.profileArr.name = this.message
        this.show = false
      } catch (error) {}
    },
    // 文件选择该表事件
    onFileChange() {
      const file = this.$refs.file.files[0]
      // const data = window.URL.createObjectURL(file)
      // console.log(data)
      this.photos = window.URL.createObjectURL(file)
      this.shows = true
      this.$refs.file.value = ''
    },
    // 图片点击事件

    // 性别
    async onConfirm(name) {
      console.log(name)
      if (name === '男') {
        try {
          await editProfile({ gender: 0 })
          this.profileArr.gender = 0
          this.show1 = false
          this.profile()
        } catch (error) {}
      } else if (name === '女') {
        try {
          await editProfile({ gender: 1 })
          this.profileArr.gender = 1
          this.show1 = false
          this.profile()
        } catch (error) {}
      }
    },
    onCancel() {
      this.show1 = false
    }
  },
  components: {
    photo
  }
}
</script>

<style lang="less" scoped>
.top {
  /deep/.van-hairline--bottom {
    background-color: #3296fa;
    .van-ellipsis {
      color: #fff;
    }
    .van-nav-bar__arrow {
      color: #fff;
    }
  }
}
</style>
